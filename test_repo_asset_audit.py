#!/usr/bin/env python3
"""Tiny stdlib regression tests for repo_asset_audit.py path resolution."""
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from repo_asset_audit import scan

class RepoAssetAuditTests(unittest.TestCase):
    def test_html_css_js_paths_and_duplicates(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "css").mkdir()
            (root / "assets").mkdir()
            (root / "img").mkdir()
            (root / "index.html").write_text(
                '<html><head><link rel="stylesheet" href="css/site.css"></head>'
                '<body><img src="assets/hero.webp"><script src="js/app.js"></script></body></html>',
                encoding="utf-8",
            )
            (root / "css" / "site.css").write_text(".hero{background:url('../img/pattern.svg')}", encoding="utf-8")
            (root / "assets" / "hero.webp").write_bytes(b"same-image-bytes")
            (root / "assets" / "hero-copy.webp").write_bytes(b"same-image-bytes")
            (root / "img" / "pattern.svg").write_text("<svg></svg>", encoding="utf-8")
            (root / "js").mkdir()
            (root / "js" / "app.js").write_text("const hero='hero.webp'; const x='assets/hero.webp'; const missing='./assets/missing.webp';", encoding="utf-8")
            report = scan(root)
            self.assertEqual(report["missing_reference_count"], 1)
            self.assertEqual(report["missing_references"][0]["normalized_path"], "assets/missing.webp")
            self.assertEqual(report["exact_duplicate_image_group_count"], 1)
            self.assertIn({"source": "js/app.js", "value": "hero.webp"}, report["basename_only_js_literals_for_manual_mapping"])
            self.assertTrue(any(row["status"] == "FOUND" and row["normalized_path"] == "img/pattern.svg" for row in report["checked_references"]))

    def test_case_only_mismatch_is_reported(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "Photo.webp").write_bytes(b"img")
            (root / "index.html").write_text('<img src="photo.webp">', encoding="utf-8")
            report = scan(root)
            self.assertEqual(report["missing_reference_count"], 1)
            self.assertEqual(report["missing_references"][0]["case_insensitive_matches"], ["Photo.webp"])

if __name__ == "__main__":
    unittest.main(verbosity=2)
