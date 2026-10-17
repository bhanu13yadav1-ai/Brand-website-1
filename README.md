# BLACKED — Intimates + After Dark Wellness (Big Update V1.5)

Mobile-first static HTML/CSS/JavaScript prototype. Built from the supplied V1.4 project while preserving the existing Intimates collection, Fit Studio, sizing guide, local wishlist, comparison, demo bag, and Women's Wellness questionnaire.

## What changed in V1.5

- New BLACKED-branded homepage campaign visual (`assets/home-after-dark-hero.webp`) with a bold violet/pink adult-wellness look inspired by the user's reference composition. The competitor's logo, original discount claims, sales claims and rating claims are not copied. This is an original generated campaign visual, not the exact third-party campaign photo.
- Separate **After Dark 18+** navigation destination and product grid. Adult products and related care items no longer appear in the default Intimates listing.
- Distinct product categories: Dildos & toys, Anal wellness, Massagers, and Lube/Care/Storage.
- After Dark search, sorting, product detail, demo bag, save/wishlist and compare actions.
- Cropped reference photos from user-provided screenshots remain in `assets/ref-massager.jpg` and `assets/ref-ring-toy.jpg`. They are labelled as references only, not verified BLACKED inventory.
- Existing Intimates section is kept focused on lingerie, garment design concepts, and separately labelled external-style inspiration.
- Existing women's Wellness Studio remains a separate section with optional prior-use and comfort questions, including optional remembered size dimensions. Responses are processed in-page only and are not saved to local storage or sent to a server by this static prototype.
- The global client-side 18+ age confirmation remains. It is not formal age verification.

## Catalog truth and product images

- The existing 10 campaign/reference images and 4 BLACKED lingerie concepts are still references/concepts unless physical inventory, supplier, dimensions, composition, price and rights have been verified.
- Wellness entries are concept illustrations until the supplier, real dimensions, material/composition, care instructions, legal labelling, price and stock are confirmed.
- No source-store discounts, star ratings, awards, sales counts or shipping estimates from screenshots were copied.
- The banner is an original generated composition inspired by the reference's bold campaign mood. It is not the exact image from the other store.
- Obtain relevant usage rights for screenshot-derived crops before public commercial promotion; replace them with authorized BLACKED product photos when available.

## Fit Studio limitations

The Fit Studio uses the customer's own photo plus a separately supplied transparent garment PNG. It positions the actual cut-out manually and is **not AI virtual try-on**, does not extract a garment from an ad/campaign poster, and does not predict size/fit. Realistic AI fitting requires a separate provider and secure backend.

## Not connected yet

This project is still a front-end prototype. No product inventory API, live prices, accounts, backend, order management, checkout, payment provider, or AI fitting API is connected. The cart is a demo cart only and must not be presented as an order-confirmation/payment flow.

## Deploy on GitHub Pages from Android

1. Download and extract this ZIP.
2. In the existing repository, replace `index.html`, `styles.css`, `app.js`, `VERSION.txt`, `README.md`, `RESEARCH-AND-UPGRADE-PLAN.md`, and `TEST-NOTES.md`.
3. Upload the entire `assets/` folder (including `home-after-dark-hero.webp`, SVG illustrations, and reference crops).
4. Preserve the repository's existing `ref-*`, `design-*`, and `syrn-*.svg` files, which legacy Intimates/Studio references still use through the existing GitHub Pages URL.
5. Commit changes and wait for GitHub Pages to publish. Refresh the site or clear its cache if you see an older build.
6. Test on Android: age gate; homepage CTAs; menu links; Intimates filters; After Dark filters/search/sort; open product; save; compare; demo bag quantity/remove; Women's Wellness conditional questions and reset; photo and transparent garment upload; size/position controls; PNG export.

## Research links

- Baymard Institute, Product List UX 2025: https://baymard.com/research-articles/current-state-product-list-and-filtering
- Baymard Institute, Mobile E-Commerce Usability: https://baymard.com/research/mcommerce-usability
- ASCI Code for Self-Regulation in Advertising: https://www.ascionline.in/the-asci-code/
- India Code, Indecent Representation of Women (Prohibition) Act, 1986: https://www.indiacode.nic.in/bitstream/123456789/5557/1/womenprohibition1986.pdf
- Planned Parenthood, Sex Toys and Safety: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys
- FASHN, Virtual Try-On v1.6 API docs: https://docs.fashn.ai/api-reference/tryon-v1-6
