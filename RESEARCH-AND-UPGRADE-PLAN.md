# BLACKED V1.5 — Research Findings & Upgrade Plan

## Research-led decisions

### 1. Separate shopping paths
The homepage now offers three distinct intents: **Intimates**, **After Dark 18+**, and **Women's Wellness**. The default Intimates grid no longer shows adult-toy or toy-care listings. After Dark has its own heading, filters, search, sort, product grid and inspiration reference strip. This matches mobile commerce research recommending clear category navigation, filtering, sorting and product comparison rather than one mixed product list.

Research: Baymard's 2025 product-list benchmark found that 78% of reviewed mobile ecommerce sites had poor-to-mediocre product-list UX. It recommends essential filters where relevant (including size and brand), visible applied filters, and useful sorting: https://baymard.com/research-articles/current-state-product-list-and-filtering

### 2. Strong branded hero without copying competitor claims
The supplied screenshot was used as a visual-direction reference for the mood/composition. The homepage uses an original generated BLACKED campaign visual with a bold violet, pink and blue palette, BLACKED Intimates + Wellness branding, and the line “BOLD OUTSIDE. BOLDER INSIDE.” It does not reuse the competitor's wordmark, prices, discounts, ratings, awards or sales-count claims. It is a fresh generated creative, not the exact third-party photo.

India-focused ad checks need truthfulness and support for measurable claims. ASCI says ads should be truthful, should not mislead, and should not include indecent/vulgar depictions of women; its code also discusses fairness and avoiding taking unfair advantage of competitor goodwill. The Indecent Representation of Women (Prohibition) Act, 1986 is another relevant source to review before public advertising. These links are research pointers, not a legal opinion; get professional advice for a live commerce business.

Sources: https://www.ascionline.in/the-asci-code/ and https://www.indiacode.nic.in/bitstream/123456789/5557/1/womenprohibition1986.pdf

### 3. Adult wellness should be bold, not misleading
The After Dark section uses mature, playful language and a more dramatic black/purple/hot-pink interface without explicit sexual-action imagery. It shows no invented discount, price, star rating, stock or delivery claim. Product entries remain “concept” listings until the owner supplies verified product data. Screenshot-derived cropped product photos are marked reference-only and should be replaced with authorized imagery or used commercially only after applicable rights are confirmed.

Product safety information is kept non-graphic and product-specific. Planned Parenthood explains that anal toys need a wide/flared base or other way to prevent loss inside the body, advises lubrication, and discusses body-safe/non-porous materials and cleaning: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys

### 4. Fit Studio remains honest about what it can do
The old demo overlay was changed in V1.2 to require an actual transparent garment cut-out alongside the customer's photo; V1.5 preserves that. It cannot remove a garment from a campaign poster. A realistic AI try-on needs a separate model and product-garment image and a backend/provider integration. FASHN docs illustrate that both person/model and product-garment images are required by the try-on API: https://docs.fashn.ai/api-reference/tryon-v1-6

### 5. Old Intimates experience improvements
- Keep Intimates results about lingerie and style references; adult toys and related care products have a dedicated section.
- Preserve the existing lingerie Fit Studio, size guide, style finder, save/compare controls and demo bag.
- Keep campaign/reference/concept disclosures so visual inspirations are not mistaken for sellable SKUs.
- Improve mobile scanning through clear section headings, condensed filters, product cards with readable titles, and product-detail popups.

### 6. Next upgrade priorities after V1.5
1. Replace reference/concept images with authorized product-only photos and garment cut-outs.
2. Confirm actual suppliers, dimensions, material documentation, care instructions, pricing, stock and local compliance before accepting orders.
3. Conduct real Android browser testing and accessibility/performance checks.
4. If approved, add a secure backend for real AI try-on and keep provider keys out of browser code; add explicit photo consent, retention/deletion controls, cost limits and failure handling.
5. Only then integrate a real inventory, checkout, payment and order system.

## Limits
This is a researched front-end prototype, not a finished/legally reviewed ecommerce release. The 18+ gate is a client-side confirmation only. The age gate does not verify identity or age. No payment, checkout, customer account, product stock API or AI fitting service is connected.
