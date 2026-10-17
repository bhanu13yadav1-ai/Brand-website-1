# BLACKED INNERWEAR — Fit Studio v0.6.0

**Build:** static HTML + CSS + JavaScript
**Budget:** designed for ₹0, no AI API, no paid API, no npm install or build tool
**Target:** Android/mobile-first; GitHub repository friendly

## Included in this version

- The 10 originally supplied reference image files remain in the release unchanged.
- Additional owner-supplied BLACKED campaign/concept images are packaged as separate assets. The 4 standalone garment-detail concept images are visual concepts, not confirmed stock.
- Cropped external-brand reference images come only from screenshots/images you supplied. The browser chrome/site interface was cropped where applicable. **No SYRN website is embedded, scraped, linked or used as a live product source.** Those images are clearly marked external reference/inspiration only and are not BLACKED inventory; public commercial use may require permission.
- Fit Studio picker dynamically lists all catalog items. Selecting an item updates the canvas to that item’s own image: a product-detail concept image when one is associated, otherwise the exact supplied image. A generic silhouette is never used as a fallback for a selected product.
- The selection summary displays the selected campaign/reference photo, plus a separate detail view if one exists.
- Customer-photo mode is optional and browser-local. A generic illustration overlay is available only after the customer chooses their own photo and explicitly switches to “My photo + guide”. It does not cut out the selected garment, detect body shape, simulate cloth or predict real fit.
- Product detail dialog has a thumbnail gallery using each item's own supplied image and available detail image.
- Collection filters, Style Finder/Quiz, compare up to three, device-local wishlist, and downloadable style-set moodboard. The “set concept” is a visual pairing, not a sellable bundle.
- Fit Detective gives general educational checks. Fit Passport can save measurements on the current device with opt-in and clear controls.
- No BLACKED sizes, prices, stock counts, customer ratings or policies are invented. The size recommendation remains disabled until actual product-specific measurements are supplied. The reviews/policy area is an honest unconfigured state.
- Responsive layout, navigation and mobile-friendly controls.

## Important before a real shop launch

1. The 10 original images are a mix of campaign visuals and design references, not 10 verified inventory SKUs. Added BLACKED artwork is concept/campaign material until you confirm physical products, construction and stock.
2. External-brand supplied images are separate design references, not BLACKED products, not a collaboration, and not linked to the external store. Verify usage rights before any public commercial use.
3. To implement actual try-on on a customer's photo without AI, provide a transparent PNG garment cut-out for each product. The current optional overlay is a generic manual illustration guide only.
4. Give us the actual bra cup/band, brief and bodysuit charts before enabling product-size recommendations.
5. Supply real price, colour, variant/stock, shipping, cancellation, hygiene returns/exchange and support details before checkout. This is still a static frontend prototype: there is no cart/order/payment backend, account system, real review database or inventory sync.
6. Fit Passport and wishlist save on the current device/browser only; they do not sync between devices. Clearing browser storage may remove them.

## Run locally / deploy

Extract this ZIP and open `index.html` in a modern browser. Keep all files from the ZIP together in the same folder. No installation is required. For GitHub, upload all extracted files (not only the ZIP) to the repository root and replace older version files. A private repository does not automatically make a hosted website private; configure access controls separately if needed.

## Research and implementation roadmap

See `RESEARCH-ROADMAP-P0-P4.md` for the consolidated priorities, rationale and acceptance-test plan. Research links include Baymard apparel UX, MDN Canvas/File API guidance and W3C accessibility guidance.
