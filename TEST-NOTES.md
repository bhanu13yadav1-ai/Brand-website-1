# V1.0 validation notes

## Checks completed
- `node --check app.js` passes with no JavaScript syntax errors.
- `index.html` passes Python's built-in HTML parser.
- All literal ID selectors in app.js match an ID in index.html.
- No duplicate IDs were found in index.html.
- Static catalogue has 23 entries.
- All newly created local SVG asset references exist.
- The product image references from the previous GitHub Pages project are retained as absolute URLs to the existing published site, so keep the original `ref-*`, `design-*`, and `syrn-*.svg` files in the repository.

## Not verified in this build environment
- A full browser click-through regression test could not be completed; the headless browser smoke attempt failed to return a DOM. Please test the live GitHub Pages build on Android after deploying.
- The original remote image URLs, canvas export permissions, age gate and storage behaviour should be tested on the actual hosted site.

## Functional scope / limitations
- Search, category filtering, local wishlist, comparison, demo cart, product detail dialog, rule-based style finder, sample-size estimator and manual photo guide are implemented in the front-end.
- This is not a production store: no verified product inventory, supplier integration, real price, order backend, payment processing, user accounts or customer analytics are connected.
- The manual guide uses a generic illustration on a user-selected photo. It is not realistic garment extraction, automatic AI virtual try-on or a fit recommendation.
- Newly added personal-wellness listings and illustrations are design concepts only. Verify supplier, composition/material, intended use, dimensions, care guidance, packaging, pricing, stock and applicable local requirements before listing real products.
- The age gate is only a browser-side confirmation and does not verify identity or age.
