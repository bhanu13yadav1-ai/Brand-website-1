# BLACKED — Intimates + Wellness Studio (Big Update v1.4)

Mobile-first static HTML/CSS/JavaScript prototype for the existing BLACKED project.

## What's new in v1.4
- New storefront discovery area inspired by the user's reference screenshots: circular category shortcuts, a horizontal “wellness style references” rail, scrolling topic chips, and mobile-friendly next/previous buttons.
- Four category photos and two product-reference photos have been cropped from screenshots supplied by the user. The crops exclude the source shop logo, pricing, promo claims, and most surrounding browser/site UI.
- The reference-photo cards are explicitly labeled as visual references and are not represented as verified BLACKED SKUs, stock, sale prices, ratings, or best-sellers.
- Homepage crop images are embedded directly into the HTML, so they continue to render if the separate `assets/` folder is accidentally omitted. Editable crop copies remain in `assets/`.
- Quick category buttons filter the existing catalogue and scroll down to it.

## Included features from earlier versions
- Client-side 18+ confirmation screen (not identity or age verification).
- Premium BLACKED visual style and mobile navigation.
- 24 catalogue options: 10 original image references, 4 BLACKED concepts, 3 separately labeled external SYRN style references, 4 personal-wellness concepts, and 3 care/accessory concepts. (Catalog item count is computed from the current source; all entries marked as concepts/references remain unverified inventory.)
- Search, category filters, device-local wishlist, side-by-side compare (up to 3), demo bag with quantity/remove controls, product detail dialog.
- Separate Women’s Wellness Studio questionnaire with optional prior-use/comfort reference questions. Answers are not saved or sent to a server.
- Manual Fit Studio with local photo preview and transparent garment-cutout overlay, position/scale/rotation controls and PNG export. It is not an AI try-on model.
- Size guide and rule-based style finder.

## Image rights and product truth
- Newly cropped product/category photos came from screenshots you supplied. They are for prototype/reference use only. Obtain the applicable rights or replace them with your own authorized product photos before commercial/public marketing.
- Cropped image subjects are visual examples only. They do not verify brand, manufacturer, composition, safety certifications, dimensions, stock, price, discount, shipping or customer ratings.
- Older campaign and concept images still load from the existing public GitHub Pages URL. Preserve the original `ref-*`, `design-*`, and `syrn-*.svg` files in that repository.
- Do not use other-brand or campaign/reference images as actual BLACKED sales listings unless you have permission and verified inventory details.

## Important limitations
- The bag is a front-end demo only. There is no real checkout, payment provider, inventory sync, customer account, order service, or backend.
- Fit Studio manually overlays a separate transparent garment PNG over a local photo. It does not extract a garment from an ad, generate AI fitting, or predict fit.
- Product wellness entries are concepts. Confirm supplier, composition, dimensions, cleaning instructions, legal labeling, pricing, stock and available sizes before selling.
- The age screen is a simple client-side confirmation, not formal age verification.

## Deploy on GitHub Pages from a phone
1. Download and extract this ZIP.
2. Replace `index.html`, `styles.css`, `app.js`, `VERSION.txt`, `README.md`, `RESEARCH-AND-UPGRADE-PLAN.md`, and `TEST-NOTES.md` in the existing repository.
3. Upload the full `assets/` folder as well (includes editable SVGs and the source JPEG crops). The new homepage crops are embedded too, so those top sections can render even if the folder is omitted.
4. Do not delete existing `ref-*`, `design-*`, and `syrn-*.svg` source images used by the older collection and the Fit Studio.
5. Commit and wait for GitHub Pages to publish. Refresh the website; if an old build appears, close/reopen the tab or clear the site's cache.
6. Test on Android: age gate, category shortcuts, popular-style rail arrows and swipe, search, filters, product popup, wishlist, compare, demo bag, Wellness Studio answers, garment PNG upload and preview export.

## No API keys needed
This prototype needs no paid APIs or API keys. A real AI try-on and live shopping checkout require separate provider/backend integration.
