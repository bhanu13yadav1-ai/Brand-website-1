# BLACKED Intimates + Wellness — Big Update V1.8

## What changed
- Added a visible three-destination tab rail: **Intimates**, **After Dark 18+**, and **Women’s Wellness**.
- Kept the premium BLACKED campaign artwork and embedded the hero image directly in `index.html`, so it will not break if the `/assets` folder is omitted.
- Embedded raster assets in `app.js`, including all eight 360 viewer frames, the massager concept image, category images, and the visual reference crops. The viewer thumbnails and main frame use those embedded sources rather than fragile relative paths.
- Added a mobile-scrollable **Top picks to explore** rail and hashtag-style category shortcuts inside After Dark, inspired by the supplied storefront screenshots without copying another store’s brand, reviews, or sale claims.
- The adult product listing stays separate from lingerie. Products are clearly labelled concept/reference until supplier, specs, price, stock and rights are confirmed.

## Install on GitHub Pages
1. Extract this ZIP.
2. Upload/replace `index.html`, `styles.css`, `app.js`, `VERSION.txt`, and the whole `assets` folder in the repository root.
3. Do not delete your existing `ref-*`, `design-*`, or `syrn-*.svg` legacy assets; some legacy Intimates cards still refer to them via the current GitHub Pages site.
4. Commit the files, wait for GitHub Pages to finish, then refresh the site. On mobile, close/reopen the tab or hard-refresh if a stale cached page remains.

## 360° viewer
- Drag horizontally, use arrows, choose one of the eight thumbnails, move the slider, or reset to front view.
- The angle frames are generated concept artwork at 0/45/90/135/180/225/270/315 degrees. This is an interactive image-sequence demo, not a supplier-certified 3D model or real product capture.

## Honest limitations
- Static front-end only. Bag, wishlist and comparison are demo/local features; payment, inventory, shipping, reviews, accounts and checkout are not connected.
- The Wellness questionnaire is informational and not medical advice; intimate answers are not stored or sent.
- The manual Fit Studio needs both a user photo and a transparent PNG garment cut-out. It does not make realistic AI try-on predictions.
- Product concepts have no verified prices, stock, materials or dimensions. Do not publish unverified safety, waterproof, body-safe or sales claims.
