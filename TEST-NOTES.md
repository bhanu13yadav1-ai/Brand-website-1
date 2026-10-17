# V1.4 validation notes

## Static checks completed
- `node --check app.js` passed with no JavaScript syntax errors.
- `index.html` passed Python's built-in HTML parser.
- 96 HTML IDs are unique; no duplicate IDs were found.
- All simple `$('#id')` selectors found in `app.js` resolve to a matching ID in `index.html`.
- All 24 catalogue records were detected in the current product data.
- All referenced `assets/*` product sources exist in the ZIP or are provided as embedded data URIs in the existing image registry.
- The 4 category crops and 2 product-reference crops are embedded directly in the new homepage HTML. Editable JPEG copies are present in `assets/`.
- The new storefront section contains 4 category shortcut tiles, 3 horizontally scrollable reference cards, 2 rail arrow buttons, and working data attributes for category filtering.
- CSS opening/closing brace counts balance.
- ZIP archive integrity was checked after packaging.

## Browser interaction test limitation
- An attempted Chromium headless browser check was blocked by the runtime's administrator policy when navigating to the local `file://` project. Therefore this release does not claim a successful full browser click-through test.
- After uploading to GitHub Pages, test the category shortcuts, horizontal swipe and rail arrows, filtering, search, product details, wishlist, compare, demo bag, Wellness Studio questionnaire, local photo upload and PNG export on an Android device.

## Image/source notes
- Six images were cropped from screenshots supplied by the user: four circular category images and two product-reference images (a massager held over clothing and a compact accessory in a hand).
- Crops exclude the original storefront logo, price labels, discounts and most surrounding web UI; they are labeled as visual references. They are not confirmed BLACKED SKUs, official product photos, price offers, ratings, or proof of inventory.
- Use authorized/original product imagery for public commercial launch unless reuse rights are confirmed.

## Known limitations
- The storefront is a front-end prototype. There is no live catalogue API, real inventory, checkout/payment, order system or customer account backend.
- Product concepts have unverified stock, price, materials and dimensions.
- Fit Studio uses a manually-positioned transparent garment cut-out with a local person photo. It is not AI virtual try-on and cannot automatically extract the garment from a campaign image.
- The 18+ gate is client-side confirmation only, not identity or age verification.
