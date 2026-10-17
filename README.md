# BLACKED Big Update V1.8

## What's changed
- A real tabbed storefront with Home, Intimates, Boyfriend, After Dark 18+, and Women's Wellness destinations.
- Home hero and locally embedded assets: the main campaign banner, new wellness illustrations, product crops, massager image and all eight 360-degree angle frames are embedded in `index.html` to avoid missing `/assets` after a phone upload.
- Dark neon product-commerce style with compact mobile product cards, search, filters, wishlist, comparison and demo bag.
- Boyfriend planner with date-night/gift/conversation idea suggestions; answers are not saved.
- The existing intimate catalogue, size guide, Fit Studio, manual transparent garment PNG overlay, and wellness questionnaire are retained.
- The 360 viewer has eight angle frames, thumbnail selection, slider, arrows, drag and reset. Frames are generated concept views, not official manufacturer photography.

## Easiest deployment from Android
**Recommended: upload only `index.html`** from this package to the root of your existing `Brand-website-1` repository and commit it. The CSS, JavaScript, homepage hero, product image assets and 360 frames are embedded inside the HTML, so they do not need a separate assets-folder upload. Keep your existing root-level `ref-*`, `design-*` and `syrn-*.svg` images; the older Intimates reference cards use those original repository files when available.

If you also want maintainable source files, `app.js` and `styles.css` are included separately for editing. The standalone `index.html` already includes embedded copies and does not require those files at runtime.

## Important limitations
- This is a static prototype; product concepts, prices, inventory, checkout, payment and orders are not connected.
- The 360 view changes between eight generated concept frames; it is not a true 3D model or verified supplier turntable.
- Fit Studio's manual mode needs the customer's photo plus a transparent garment PNG. It is not AI virtual try-on.
- The age gate is a front-end confirmation, not identity verification.
- Some legacy Intimates photos are loaded from the existing GitHub Pages repository's root files. Do not delete those originals when replacing `index.html`.
