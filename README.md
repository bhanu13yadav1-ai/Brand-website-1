# BLACKED — Intimates + Wellness Studio (Big Update v1.0)

Mobile-first static HTML/CSS/JavaScript prototype for the existing BLACKED project.

## Included features
- Adult age-confirmation screen (front-end confirmation only; not age verification)
- Refreshed premium BLACKED visual style
- 23 catalogue options: 10 original reference images, 4 BLACKED design concepts, 3 separately-labelled external SYRN inspiration items, plus 3 personal-wellness toy concepts and 3 care/accessory concepts
- Search and category filters
- Local wishlist with device storage where allowed
- Side-by-side compare for up to three items
- Demo bag with quantity changes and remove/clear actions
- Product detail dialog
- Manual Fit Studio with local photo preview, draggable generic guide, scale control and PNG export
- Mobile navigation and clear notes about concepts, materials, stock, sizing and checkout
- Non-explicit SVG product illustrations for the new wellness category

## Important truth-in-labeling / launch notes
- Product wellness items are concept entries, not verified inventory. Confirm supplier, composition, dimensions, safety information, packaging, local requirements, prices and available stock before offering them for sale.
- The shopping bag is a front-end demo only. No real order, checkout, payment, inventory, or customer account backend is implemented.
- Fit Studio is not AI virtual try-on. It shows a reference photo or overlays a generic adjustable illustration on a photo selected locally in the browser. It does not extract garments from photos or predict size/fit.
- Existing campaign/design images are reused from the published GitHub Pages URL to avoid redistributing the source image files in this package. For a fully self-contained offline package, copy the original `ref-*` and `design-*` image assets from the current repo into this package and switch the image paths in `app.js` to relative paths.
- The age confirmation is a simple client-side gate and is not identity/age verification.

## Deploy to the existing GitHub Pages repo on a phone
1. Download and extract this ZIP.
2. Keep the existing `ref-*` and `design-*` image files in the repo. They are still used by the catalogue via the current public Pages URL.
3. Upload/replace `index.html`, `styles.css`, and `app.js` from this package at the repository root. Upload the new `assets/` SVG folder too.
4. Commit changes and wait for GitHub Pages to finish publishing. Then open the site in a browser and refresh; if an old build remains cached, close/reopen the page or clear site cache.
5. Test the age gate, catalogue filters, search, product details, save, compare, demo bag and Fit Studio on Android before public launch.

## No API keys needed
This static preview doesn't require paid services or API keys. Real AI fitting, live product catalogues and payment processing require separate compatible services/backend work.
