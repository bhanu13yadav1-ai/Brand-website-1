# V1.1 validation notes

## Static checks performed in build container
- `node --check app.js` passes.
- `index.html` parses with Python's built-in HTML parser.
- Literal JavaScript `$('#id')` selectors match HTML IDs.
- No duplicate IDs were found.
- Catalogue metadata contains 23 products.
- All new wellness SVG images are embedded as data URIs in `app.js`; the page no longer relies on `/assets/` being deployed for those six images and fallback art.
- Fit Studio now offers non-drag position nudge controls and keeps the selected reference view visible until the user explicitly taps the manual guide.

## Not verified here
- A full browser click-through/Android regression run could not be completed in the available environment.
- Live GitHub Pages asset availability, mobile-specific uploads, remote image canvas export permissions, age confirmation persistence and storage behavior must be tested on the actual deployed site.
- FASHN AI/API integration is research only and is not connected.

## Known limitations
- Legacy `ref-*`, `design-*`, and `syrn-*.svg` images still load from the current public GitHub Pages URL. Keep those original files in that repository.
- Catalogue prices, stock, actual SKU/material documentation and product sizes are unconfirmed.
- Cart is a demo only; no checkout, payment, inventory, account, or order backend exists.
- Fit Studio guide is a generic manual overlay, not AI garment replacement, accurate size recommendation or fit guarantee.
- Age gate is only a client-side confirmation, not identity/age verification.
