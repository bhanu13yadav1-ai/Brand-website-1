# Phase 0 — Preflight Audit Checkpoint

**Date:** 21 October 2026  
**Status:** Initial static source review completed; full baseline is NOT COMPLETE until deployed-site/browser/network tests and all source assets are available.

## Repositories reviewed

| Repository | Observed top-level entries | Image files | Useful role | Main findings |
|---|---:|---:|---|---|
| [Brand-website-3](https://github.com/bhanu13yadav1-ai/Brand-website-3) | 113 | 99 | Candidate feature-rich migration base | Feature-rich HTML/JS/CSS; 16 local asset references did not match the top-level file paths; title/version metadata differs. |
| [Brand-website-4f](https://github.com/bhanu13yadav1-ai/Brand-website-4f) | 87 | 66 | Original wheels and compact prototype patterns | HTML points to `css/styles.css` + `js/app.js` while current source files are root-level; multiple `assets/` image paths do not match root assets; 7 of 10 literal service-worker core entries miss current paths. |
| [Brand-website-full-finally-](https://github.com/bhanu13yadav1-ai/Brand-website-full-finally-/tree/main) | 115 | 100 | Additive gallery/fallback patch source | README calls this a delta; target-repository instructions conflict across docs; service-worker paths are expected to target the base app and cannot be judged as a standalone app. Exact repo name includes trailing hyphen. |

Counts represent the repository's top-level listing and source files read through the connected GitHub tool. They are not a live site test and not a full binary download.

## Preserve inventory

- Innerwear catalogue, category/filter/search/sort, product details, saved wishlist and compare.
- Fit Studio local photo preview/canvas and only product-specific overlays; no AI try-on claim.
- Fit Passport, Fit Detective, size guidance, verified product-size chart behavior.
- Eight-frame 360-degree concept viewer.
- Original 10-image Sanskari gallery/artworks, plus compatible extra gallery assets only after source-level identity/path checks.
- Boyfriend/Plus-One/date planning/message helper/conversation starters.
- Three original wheel flows from `Brand-website-4f`: Dildo sizing, Butt Plug sizing, Boyfriend range/deal wheel.
- Wellness guides, age self-attestation UI, fit notes and existing demo bag/reward behavior where present.
- Manifest, icons and service-worker/offline behavior only after their cache paths and update lifecycle are corrected.
- Supported local data keys/values after inventory and migration plan; no storage wipe.

## Prioritized observed issues / risk register

1. **High — image path mismatch:** file names/folders in code and repo root do not consistently align. Verify each required source image and use a single manifest with actual paths.
2. **High — HTML script/CSS references in Brand-website-4f:** current root listing has `app.js`/`styles.css` but HTML references `js/app.js`/`css/styles.css`.
3. **High — service worker stale/missing entries:** Brand-website-4f has 7 literal cache path misses. The delta's cache entries target the underlying base repository, so apply only to the verified target; do not copy its service worker blindly.
4. **High — exact deployed root cause unknown:** no browser console/network trace or live Pages smoke test was available; static mismatches are strong leads, not complete causal proof.
5. **Medium — version drift:** HTML title/version and README/validation files differ in both source repositories. Select one authoritative release number and update documentation with the implementation.
6. **Medium — duplicate assets:** exact byte-level duplicate groups exist in 4f and the delta package. Record them; do not delete without confirming references and user intent.
7. **Medium — misleading demo commerce risk:** prices/discounts/cart/stock/reviews are illustrative in documentation. Clearly label prototypes and never imply real checkout or inventory.
8. **Medium — inconsistent target instructions:** delta repository mentions different target names. Do not apply until target path and patch preconditions are confirmed.
9. **Medium — fit preview integrity:** keep a single selected product ID and ensure title, image, overlay, gallery and download all refer to the same item.
10. **Medium — privacy:** no sensitive content may be described as private/encrypted unless storage/security implements it. Keep local photo processing local and verify network behavior.

## Original wheel locations identified from existing HTML/JS

1. Wellness > Dildo size/preference wheel (`dildoPreference`, `dildoExperience` in `Brand-website-4f/index.html`).
2. Wellness > Butt Plug size/preference wheel (`plugPreference`, `plugExperience`).
3. Boyfriend > size/deal wheel (`boyPreference`, `boyResult`). The code uses shared `spinWheel` logic in `app.js`; location-specific tests are still mandatory.

## Research sources selected/opened

- WHO: no medical examination can establish sexual history from hymen appearance; do not build a “virginity check” feature.
- Planned Parenthood: distinguish external vulva anatomy from internal vagina and use correct terminology.
- RAINN: consent needs to be voluntary and ongoing; provide skip/stop choices and avoid pressure.
- W3C WCAG 2.2: interactive pointer targets should meet 24×24 CSS px minimum or an applicable exception; use larger targets when practical.
- GitHub Pages docs: published root/folder and project-site URL structure matters; test the actual output paths.
- GitHub Actions security docs: least privilege for tokens/secrets; never place publishing credentials in public front-end JavaScript.

## Verification limitations / blocker log

- Git clone from this runtime failed because it could not resolve github.com. The connected repository integration could read selected text files and image samples, but did not provide a locally mounted complete repository archive.
- GitHub connection reports no push permission. Therefore: no repository write, PR, commit or deployment is claimed.
- Live public Pages browsing/network waterfall and Android device interaction not verified.
- Actual original image files have not yet been included in the Step 1 ZIP. They must be imported from the source repos/source archive before claiming the asset repair is complete.

## Phase 0 exit criteria

- [x] Identify three candidate source repositories.
- [x] Create initial feature inventory and preservation list.
- [x] Identify three original wheel locations by source IDs.
- [x] Record static path/version/target-repo risks.
- [x] Select initial research sources.
- [ ] Complete deployed-site smoke test and console/network capture.
- [ ] Import full original assets and generate byte/path manifest.
- [ ] Confirm current production URL and hosting/deployment configuration.

Phase 0 is **closed for the available source/static-audit scope**, as requested in the project sequence. Live deployment, asset binary import, and Android checks remain explicitly **NOT TESTED/BLOCKED** and are carried forward; closing the planning checkpoint does not mean those runtime requirements passed.


## Step 1 tooling added after audit

- `qa/repo_asset_audit.py` is now included for use once an actual source ZIP/archive is available. It checks explicit local asset paths, CSS-relative URLs, case-sensitive mismatches, external references and exact duplicate image hashes.
- Its unit tests pass 2/2. Running it against the foundation shell only does **not** validate the missing source archives or production deployment.
