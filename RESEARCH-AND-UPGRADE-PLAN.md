# BLACKED Intimates + Wellness Studio — Research-backed Big Update Brief

**Prepared:** 17 October 2026  
**Scope:** the two issues shown in the user screenshots: Fit Studio and the Women's Personal Wellness catalogue.

## Executive finding

The screenshots show two distinct problems, not one generic design issue:

1. **Wellness cards have broken product images.** In V1.0, `app.js` points new product images at `assets/silicone-dildo.svg`, `assets/flared-base-plug.svg`, etc. The fallbacks point to the same local `assets/` directory. If the directory is omitted while uploading files through the phone's GitHub interface, both the primary image and fallback fail. That matches the screenshot. V1.1 embeds those small SVG illustrations in `app.js` and routes the fallback through the embedded image map, so those six wellness/care cards continue to render even if the folder is missed.
2. **Fit Studio shows a campaign/reference image, not a garment cut-out applied to a person.** A campaign poster with text and inset details is not an ideal try-on garment input. The current manual overlay is a generic illustration and must not be presented as an exact garment fit. V1.1 improves the interaction and explicitly labels this state, but it still does not claim to provide AI try-on.

## Evidence-led recommendations

### 1. Fit Studio: separate the user journey into explicit stages

**Recommended path**

1. Select a *verified product SKU* from a product-only image gallery (front/back/detail views when available). Keep campaign creative in a separate inspiration/gallery section.
2. Select or upload a photo with a short plain-language notice explaining whether it stays in-browser or is sent to an AI service.
3. Preview only after the user explicitly chooses the appropriate mode. Do not switch modes unexpectedly after file upload.
4. While AI is not connected, call the existing function a **Manual guide**, not AI try-on. Give it scale controls, accessible position nudge buttons, reset, clear photo and save/export.
5. If/when AI is connected, show progress, cancellation/error/retry, provider status, and a generated result with an explicit note that the image is a visual preview—not size or fit certification.

**Why this is the right distinction**

- A product-only garment image and a model/person image are the two inputs documented by FASHN's virtual try-on API. Its endpoints return a prediction ID and are asynchronous; a production front end needs a backend route to submit requests and poll result status.
- FASHN documents a `permissive` moderation mode that allows underwear and swimwear while still blocking explicit nudity; its Terms prohibit pornographic content, explicit nudity and deceptive unconsented imagery of identifiable people. This means any integration must be designed around lawful, consensual and non-explicit use, not bypass moderation.
- Do not expose the provider API key in browser JavaScript. FASHN's current Terms say API keys must not be exposed in public/client-side code.
- A visual try-on image is not an accurate body measurement or a guaranteed fit. Keep garment sizing based on verified product measurements and manufacturer size charts.

### 2. Wellness catalogue: make the images reliable and the product cards trustworthy

**Must fix immediately**

- Bundle or embed the six new product illustrations. Don't have the main image and fallback depend on the same missing directory.
- Give every image a stable aspect ratio; don't let failed or late images collapse the card or leave blank panels.
- Use `loading="lazy"` only for below-the-fold product thumbnails, set image dimensions/aspect-ratio to reserve space, and serve appropriately sized compressed formats as the catalogue grows.
- On phones, show a clear filter interaction and a hint that the category row scrolls; later, a dedicated mobile filter sheet with visible applied filter chips and a results count will be easier to understand.

**Product truth and safety**

- Show concept items as **Concept / not yet available**, not as stock, until a real supplier, product identity, material, dimensions, price, inventory, care instructions and product images are confirmed.
- For anal toys, the listing should verify that the actual product has a suitable flared base or equivalent retrieval feature. Planned Parenthood also advises using lubricant for anal toys, cleaning toys with mild soap and water per product instructions, not transferring a toy from anus to vagina without washing/changing the condom, and choosing appropriate non-porous body-contact materials.
- Don't claim "body-safe silicone", "waterproof", "medical grade", or a specific use unless supplier documentation supports it. Link the actual manufacturer's instructions.
- Keep personal lubricant's ingredients and compatibility, cleaner ingredients, expiry date and relevant packaging data tied to the actual SKU—not placeholder marketing copy.
- Keep a secure/private photo model separate from the ordinary product catalogue; don't log, publicly store, or reuse user photos for marketing without a separate lawful basis and permission.

### 3. Mobile shopping UX: simplify instead of adding decorative controls

Baymard's 2025 benchmark reports that 78% of audited mobile e-commerce sites perform poorly or moderately on product-list UX, and recommends clear filtering, useful thumbnails and visible applied filters. Its 2026 product-list article recommends a sticky filter drawer on mobile and removable chips that show which filters are active.

For BLACKED, the next pass should add, only when the data exists:

- Search that supports common synonyms and a good no-results state.
- Product-type filters specific to the inventory: size, colour, material, price and availability. Do not show price/stock filters while every price and stock value is unverified.
- Applied filter chips and a results count, plus “clear all”.
- Product cards with useful image, name, verified price/stock or a clearly labelled concept state, and one clear primary action.
- Product detail galleries with at least front, back and material/closure detail images where relevant.

### 4. Performance and accessibility targets

Use Google's Core Web Vitals as measurable release criteria: **LCP ≤ 2.5 seconds, INP < 200 ms, CLS ≤ 0.1** at the 75th percentile when sufficient field data exists. On a small static prototype, first benchmark on the target Android phone and mobile connection rather than claiming these targets are already met.

Follow the W3C WCAG 2.2 AA baseline: pointer targets at least 24×24 CSS pixels (larger is recommended for phone comfort), visible keyboard focus, accessible labels and alternatives for dragging. V1.1 adds arrow controls so repositioning the manual guide does not require dragging alone.

For user photo upload, keep the allowed types and size limit, handle decode errors, and don't trust file extension/MIME type alone if the feature ever starts processing uploads on a server. A future backend must validate content and impose file size/rate limits.

## AI try-on option research

### FASHN API (commercial API candidate)

- The API reference offers `tryon-v1.6` (described as a fast, lightweight endpoint; one credit per output) and `tryon-max` (higher fidelity, with cost affected by output resolution/generation mode).
- Current public API pricing says on-demand credit purchase starts at **$7.50 for 100 credits**. This is a planning estimate only; check current billing and per-endpoint cost before launch. At one credit/output, that is $0.075 per successful v1.6 output before hosting, storage, retries or tax.
- Required integration shape: phone browser → trusted serverless/backend endpoint → provider API; backend keeps secret API key, checks request size/rate and user consent, returns a job ID, polls status, and gives the final result to the browser. Never call the authenticated API directly from public front-end JavaScript.
- For privacy, FASHN's docs discuss base64 for sensitive user photos and `return_base64: true` to reduce the provider output availability window; alternatively use short-lived signed URLs. Review the provider's current terms, DPA, retention and moderation settings at implementation time.
- Provider content rules prohibit explicit nudity/pornographic content and deceptive unconsented imagery of identifiable people. Verify intended lingerie workflow with the provider and keep use non-explicit and consent-based.

### Open-source caution

CatVTON and IDM-VTON repository licenses currently show CC BY-NC-SA 4.0 / non-commercial restrictions. Do not assume a popular public GitHub model can be put into a commercial store for free; obtain commercial rights or select a commercially permitted provider.

## Recommended release sequence

### P0 — repair screenshot defects

- Ship V1.1's embedded SVG fallback.
- Verify all six wellness/care cards render even when `/assets/` is deliberately unavailable.
- Verify the hero and product-dialog images have a fallback.
- Check all 23 product paths and remote legacy image paths on the real deployed site.

### P1 — make current front-end honest and accessible

- Make product concept versus stock status explicit and consistent across card, dialog, compare and demo bag.
- Keep photo upload in product view until the visitor explicitly enters manual-guide mode.
- Keep accessible arrows, size slider, reset and clear photo controls functional with no image selected/selected.
- Audit small tap targets, focus states, filter overflow, and 360–430 CSS px viewport layouts.

### P2 — create genuine catalogue data

For each real SKU, define product id, SKU, category, price/currency, inventory status, sizes/colours, material, care instructions, shipping/returns, images, image rights, safety documentation, and product-specific fit chart. Until then, keep concept entries out of a real checkout.

### P3 — connect AI/backend only after provider and budget approval

- Evaluate real product-only garment assets across a test set of customer-consented model photos.
- Test brand accuracy (laces, colours, straps, logo), identity preservation, pose preservation, failures, moderation rejections, response time and cost per successful output.
- Secure backend key, explicit photo-processing disclosure/consent, rate limit, job-status UI, safe retention/deletion, and error/retry paths.
- Add production order/cart/payment only after catalog prices, stock, shipping, return policy and a secure payment provider exist.

## Validation status for V1.1

The updated source is intended to fix the missing-asset failure and improve mode clarity. Static checks can verify JS syntax, HTML ids and ZIP contents, but they do not prove every mobile tap flow works. After deploy, run the on-device checks below.

### Android acceptance checklist

- [ ] Age confirmation and underage-return path work.
- [ ] Homepage, all catalogue images, all 6 new wellness/care illustrations and modal images display.
- [ ] Search; every category filter; empty search state; save; compare 1/2/3 items; remove/clear.
- [ ] Demo bag add/decrease/increase/remove/clear and no-checkout notice.
- [ ] Select an apparel reference; verify no-image canvas fallback; verify uploaded photo remains local; manual mode is an explicit action; guide scale, arrow positioning, dragging, reset, clear and PNG download.
- [ ] Denied/corrupt/oversized upload produces an understandable message.
- [ ] 360, 390, 412 and 430 CSS px widths: no clipped text/buttons or horizontal page-level overflow.
- [ ] Refresh/return: local wishlist and bag behave as documented; age gate is understood as client-only confirmation.
- [ ] New wellness items are still labelled concepts and not purchasable stock until supplier data is verified.

## Research sources

- Baymard Institute, “Product List UX Best Practices 2025” (updated Sep 9, 2025): https://baymard.com/research-articles/current-state-product-list-and-filtering
- Baymard Institute, “Product Listing Page UX: Definition & Ecommerce Best Practices” (Aug 20, 2026): https://baymard.com/blog/product-listing-page-plp-ux
- Baymard Institute, mobile e-commerce usability research: https://baymard.com/research/mcommerce-usability
- web.dev, image loading, responsive images and layout shift: https://web.dev/learn/html/images and https://web.dev/articles/optimize-cls
- Google Search Central, Core Web Vitals, updated Dec 10, 2025: https://developers.google.cn/search/docs/appearance/core-web-vitals?hl=en
- W3C, Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/wcag/
- FASHN API docs, Try-On Max: https://docs.fashn.ai/api-reference/tryon-max
- FASHN API docs, Try-On v1.6: https://docs.fashn.ai/api-reference/tryon-v1-6
- FASHN current API pricing: https://help.fashn.ai/plans-and-pricing/api-pricing
- FASHN API retention/privacy guide: https://docs.fashn.ai/api-overview/data-retention-privacy
- FASHN Terms of Service (last updated Aug 7, 2026): https://fashn.ai/legal/terms-of-service
- Planned Parenthood, Sex Toys / cleaning and anal-toy safety: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys
- OWASP File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- CatVTON repository and license: https://github.com/Zheng-Chong/CatVTON
- IDM-VTON repository and license: https://github.com/yisol/IDM-VTON
