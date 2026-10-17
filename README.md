# BLACKED INNERWEAR — Fit Studio v0.5.1

**Stack:** plain HTML + CSS + JavaScript  
**Target:** Android/mobile-first, free prototype, no AI or paid APIs  
**Build step:** none; open `index.html` or upload the files to a static host.

## What is in this release

- Premium BLACKED INNERWEAR landing page and responsive navigation.
- The same 10 original user-provided reference images are included unchanged, plus 4 user-provided BLACKED design-concept poster images and separate product-only detail images for those four concepts.
- A 17-option Fit Studio picker: 10 original references, 4 added BLACKED concepts, and 3 original schematic style illustrations linked to separate SYRN product pages for inspiration. The three SYRN items are clearly marked as a separate brand and not BLACKED inventory.
- **Fix for the selected-product / demo-image issue:** the main canvas now shows the exact selected product/reference image by default. The generic demo silhouette has been removed. Selecting a style changes the main canvas to that selected image; the 4 newer BLACKED concepts show their product-only image in the canvas.
- The personal-photo illustration guide is disabled until the customer selects their own photo. Uploading a photo does not replace the product photo in the main canvas; the user must explicitly choose “My photo + guide” to see their uploaded image with a generic manual illustration overlay.
- Product filters, product detail dialog, style quiz, size finder / local Fit Passport, compare up to 3 references, saved-style wishlist, and style moodboard.
- Local photo preview and PNG export. Selected customer photos are processed inside the browser; this static prototype does not post them to a server.
- Mobile-first layout and accessibility labels/focus styles.

## Important limitations

1. This is **not AI virtual try-on**. A campaign image cannot automatically be separated into an exact garment layer by this prototype. The optional “My photo + guide” view uses a generic adjustable illustration over the customer's photo; it does not extract the selected product, fit the garment to body contours, simulate fabric, or predict sizing.
2. The 10 original images include both BLACKED campaign artwork and reference screenshots/photos. They are not 10 verified inventory SKUs. The 4 newer BLACKED designs are still concepts until you confirm physical products, construction, size specs, price, availability and rights to the images.
3. The SYRN-inspired items are schematic illustrations with links to SYRN's own product pages, not copied official product photos and not BLACKED products for sale.
4. The size finder uses a sample chart. Replace the sample with measurements from actual garments before letting customers rely on size advice.
5. There is no cart, inventory sync, order backend, checkout, payment processing, user account or review database in this static prototype.
6. Wishlist and Fit Passport save in the current browser/device only where browser storage is available. They are not synchronized between devices.

## Open locally

Extract the ZIP and open `index.html` in a modern browser. All local images, CSS and JavaScript are in the same folder. If an Android file viewer blocks local HTML, upload the extracted files to your private repository or use a local preview server.

## Put it in GitHub

1. Create or open your GitHub repository.
2. Extract this ZIP and upload **all files inside it** to the repository root, including `index.html`, `styles.css`, `app.js`, README/test notes, all 10 `ref-*` images, all `design-*` concept images/detail photos, and all three `syrn-*.svg` illustrations.
3. Replace old files in the existing repository; do not leave an old `app.js` or old reference photos mixed with the new HTML.
4. A private GitHub repository keeps the source private. A normal static Pages/Cloudflare deployment has a public website URL unless an access restriction is added.

## Research references used for UX direction

- Baymard Institute — apparel e-commerce UX: https://baymard.com/industries/apparel-ux
- Baymard Institute — apparel UX best practices: https://baymard.com/research-articles/apparel-5-best-practices
- MDN — using images with Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
- MDN — using files in web applications: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
- W3C WAI — WCAG 2.2: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
