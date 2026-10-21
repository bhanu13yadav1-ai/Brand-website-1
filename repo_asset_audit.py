#!/usr/bin/env python3
"""Audit a downloaded source repository for missing local asset references.

Usage:
  python qa/repo_asset_audit.py /path/to/repository
  python qa/repo_asset_audit.py /path/to/repository --json report.json

This tool is intentionally dependency-free. It checks explicit references in HTML/CSS/JS
and reports basename-only JS image literals separately because those may be prefixed at
runtime (for example, `ASSET + name`) and must not be falsely marked missing.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import posixpath
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ASSET_EXT = r"(?:png|jpe?g|webp|gif|svg|avif|ico|css|js|webmanifest|woff2?|ttf|otf|mp4|pdf|json)"
ASSET_END = re.compile(rf"\.{ASSET_EXT}(?:[?#].*)?$", re.I)
URL_SCHEME = re.compile(r"^(?:https?:|data:|blob:|javascript:|mailto:|tel:|//)", re.I)

class MarkupAssets(HTMLParser):
    def __init__(self, path: Path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.references: list[dict[str, str]] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in {"img", "source", "script", "iframe", "video", "audio", "track", "input"}:
            for key in ("src", "poster"):
                value = a.get(key)
                if value:
                    self.references.append({"source": str(self.path), "attribute": key, "value": value, "kind": "markup"})
        if tag == "link":
            rel = (a.get("rel") or "").lower().split()
            if set(rel) & {"stylesheet", "icon", "manifest", "preload", "modulepreload", "apple-touch-icon"}:
                value = a.get("href")
                if value:
                    self.references.append({"source": str(self.path), "attribute": "href", "value": value, "kind": "markup"})
        if tag == "img" and a.get("srcset"):
            for part in a["srcset"].split(","):
                url = part.strip().split()
                if url:
                    self.references.append({"source": str(self.path), "attribute": "srcset", "value": url[0], "kind": "markup"})


def is_external(value: str) -> bool:
    return bool(URL_SCHEME.match(value.strip())) or value.strip().startswith("#")


def clean_url(value: str) -> str:
    value = value.strip().strip("\"'")
    value = urlsplit(value).path
    return value.replace("\\", "/")


def read_text(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return None


def scan(root: Path) -> dict:
    root = root.resolve()
    if not root.is_dir():
        raise ValueError(f"Not a directory: {root}")

    refs: list[dict[str, str]] = []
    external: list[dict[str, str]] = []
    basename_literals: list[dict[str, str]] = []
    source_files = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in {".html", ".htm", ".css", ".js", ".mjs"}]

    for file in source_files:
        content = read_text(file)
        if content is None:
            continue
        if file.suffix.lower() in {".html", ".htm"}:
            parser = MarkupAssets(file.relative_to(root))
            parser.feed(content)
            refs.extend(parser.references)
        elif file.suffix.lower() == ".css":
            for match in re.finditer(r"url\(\s*(['\"]?)(.*?)\1\s*\)", content, re.I):
                value = match.group(2).strip()
                if value and ASSET_END.search(value):
                    refs.append({"source": str(file.relative_to(root)), "attribute": "css-url", "value": value, "kind": "css"})
            for match in re.finditer(r"@import\s+(?:url\()?\s*['\"]([^'\"]+)['\"]", content, re.I):
                refs.append({"source": str(file.relative_to(root)), "attribute": "css-import", "value": match.group(1), "kind": "css"})
        else:
            # Explicit runtime-relative paths are testable. Basename-only references
            # may be prefixed by runtime helpers and are logged for manual mapping.
            for match in re.finditer(r"['\"`]([^'\"`\r\n]+)['\"`]", content):
                value = match.group(1).strip()
                if not ASSET_END.search(value):
                    continue
                if is_external(value):
                    external.append({"source": str(file.relative_to(root)), "value": value})
                elif "/" in value or value.startswith((".", "/")):
                    refs.append({"source": str(file.relative_to(root)), "attribute": "js-literal", "value": value, "kind": "js"})
                else:
                    basename_literals.append({"source": str(file.relative_to(root)), "value": value})

    file_paths = {p.relative_to(root).as_posix(): p for p in root.rglob("*") if p.is_file()}
    casefold_map: dict[str, list[str]] = defaultdict(list)
    for rel in file_paths:
        casefold_map[rel.casefold()].append(rel)

    checked = []
    for ref in refs:
        value = ref["value"]
        if is_external(value):
            external.append({"source": ref["source"], "value": value})
            continue
        clean = clean_url(value)
        if not clean:
            continue
        # HTML/script asset URL paths resolve relative to the published document root;
        # CSS url() paths resolve relative to the stylesheet itself.
        if clean.startswith("/"):
            candidate = clean.lstrip("/")
        elif ref["kind"] == "css":
            candidate = posixpath.normpath((Path(ref["source"]).parent / clean).as_posix())
        else:
            candidate = posixpath.normpath(clean).removeprefix("./")
        status = "FOUND" if candidate in file_paths else "MISSING"
        row = {**ref, "normalized_path": candidate, "status": status}
        if status == "MISSING":
            row["case_insensitive_matches"] = casefold_map.get(candidate.casefold(), [])
        checked.append(row)

    hashes: dict[str, list[str]] = defaultdict(list)
    for rel, path in file_paths.items():
        if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"}:
            try:
                digest = hashlib.sha256(path.read_bytes()).hexdigest()
                hashes[digest].append(rel)
            except OSError:
                pass
    duplicates = [paths for paths in hashes.values() if len(paths) > 1]

    return {
        "root": str(root),
        "source_file_count": len(file_paths),
        "source_code_files_scanned": len(source_files),
        "explicit_local_reference_count": len(checked),
        "missing_reference_count": sum(row["status"] == "MISSING" for row in checked),
        "missing_references": [row for row in checked if row["status"] == "MISSING"],
        "checked_references": checked,
        "external_reference_count": len(external),
        "external_references": external,
        "basename_only_js_literals_for_manual_mapping": basename_literals,
        "basename_only_literal_count": len(basename_literals),
        "exact_duplicate_image_groups": duplicates,
        "exact_duplicate_image_group_count": len(duplicates),
        "scope_note": "Static path audit only. It cannot prove that external URLs load or that runtime-generated paths are correct. Test the deployed site separately.",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path, help="Downloaded repository/source archive directory")
    parser.add_argument("--json", dest="json_path", type=Path, help="Optional JSON report output path")
    args = parser.parse_args()
    try:
        report = scan(args.root)
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    text = json.dumps(report, indent=2, ensure_ascii=False)
    print(f"Source files: {report['source_file_count']} | code files scanned: {report['source_code_files_scanned']}")
    print(f"Explicit local refs: {report['explicit_local_reference_count']} | missing: {report['missing_reference_count']}")
    print(f"External refs logged: {report['external_reference_count']} | JS basename literals for mapping: {report['basename_only_literal_count']}")
    print(f"Exact duplicate image groups: {report['exact_duplicate_image_group_count']}")
    if report["missing_references"]:
        print("MISSING PATHS:")
        for row in report["missing_references"]:
            matches = row.get("case_insensitive_matches") or []
            suffix = f" (case-insensitive candidates: {', '.join(matches)})" if matches else ""
            print(f"- {row['source']} -> {row['normalized_path']}{suffix}")
    if args.json_path:
        args.json_path.parent.mkdir(parents=True, exist_ok=True)
        args.json_path.write_text(text + "\n", encoding="utf-8")
        print(f"JSON report written: {args.json_path}")
    return 1 if report["missing_reference_count"] else 0

if __name__ == "__main__":
    raise SystemExit(main())
