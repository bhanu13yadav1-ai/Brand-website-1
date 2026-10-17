# V1.8 Testing Notes

## Static checks completed
- `node --check app.js`: passed.
- Python HTML parser: passed.
- HTML IDs: 116 unique IDs; no duplicates.
- In-page anchor targets: no missing targets found.
- Static `<img>` tags using fragile relative `assets/...` paths: none found; hero, 360 start frame, and visual-inspiration images are embedded directly in HTML.
- Embedded critical asset map: hero, all 8 360 angle frames, massager concept, and reference crops are present in `app.js`.
- CSS parse with `tinycss2`: 495 top-level rules/tokens, no top-level parse errors.
- ZIP integrity: checked after packaging.

## Browser testing limitation
A Chromium/Playwright click-through test was attempted, but runtime navigation was blocked by administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`) for both localhost and file URLs. Therefore a full live browser/device pass is **not claimed**. The interaction code is statically checked but still needs Android verification after deployment.

## Deployment status
This ZIP has not been deployed to GitHub Pages. Upload the files, commit, wait for Pages to publish, then test the 3 main tabs, product search/filter, wishlist, compare, demo bag, Wellness questionnaire, photo/garment upload, and every 360 viewer control on the actual phone.

## Known limitations
- The 360 viewer uses eight generated concept frames at 45-degree intervals, not supplier-supplied 3D photography.
- Legacy Intimates campaign/design photos continue to use the existing public GitHub Pages asset URLs where those files already exist in the repository; keep old `ref-*`, `design-*`, and `syrn-*.svg` assets intact.
- Actual product SKUs, materials, dimensions, prices, availability, reviews, checkout, payments and fulfilment are not connected.
- The Fit Studio is a manual cut-out overlay, not AI fit prediction.
