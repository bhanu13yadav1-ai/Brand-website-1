# V1.9 Test Notes

## Static checks
- HTMLParser parse: PASS
- Inline JavaScript syntax via `node --check`: PASS
- CSS parse errors: 0 (tinycss2)
- Duplicate HTML IDs: 0 (none)
- Missing required UI IDs: 0 (none)
- Broken in-page anchors: 0 (none)
- Embedded image assets: 29 data URIs; all 8 360-frame keys included.
- Single-file runtime: `index.html` contains HTML, inline CSS, inline JavaScript and all core image bytes. External asset folder is not required at runtime.
- Feature code present: navigation, local demo bag, wishlist, compare, search, filters/sort, wellness conditional questions, manual cut-out canvas, image download, 360 image sequence controls.

## Not claimed
- Full automated browser click-through was not available in this environment, so interactive controls still need smoke-testing on the target Android browser after deployment.
- The website has not been published to GitHub Pages from this session.
- Cart/checkout is demo-only. Prices/inventory/payment are not connected.
- Generated/cropped product images are concepts, not supplier-certified photos or proof of stock.
- The 360° view is an 8-frame image sequence, not a true 3D model.
