# V1.4 — Research and upgrade plan

## Goal
Make the home screen feel more like an actual wellness storefront without copying another store's logo, false offers, prices, stars, sales counts or exact branding. Preserve the existing BLACKED palette and existing features.

## Implemented in this package
1. **Store discovery:** category shortcut rail with four cropped thumbnails, trust/clarity strip, “Wellness style references” horizontal card rail, quick topic chips, and prev/next rail buttons.
2. **Reference image handling:** six image crops from user-supplied screenshots are embedded directly in the homepage HTML for resilience and also retained as editable local assets. Two larger product crops (a massager shown over clothing, and a small accessory held in a hand) are used only in cards labeled “reference image.” No third-party store logo, price, star rating, offer or delivery claim is carried over.
3. **Honest product labels:** these cards avoid invented bestseller status or sale prices. Existing wellness SKUs remain marked concept/references until product data is confirmed.
4. **Working navigation:** category and topic buttons filter the existing catalogue and scroll to the collection; mobile cards use horizontal scroll and buttons.
5. **Keep existing journeys:** Fit Studio, the separate Wellness Studio questionnaire, size guide, search, local wishlist, comparison and demo bag were preserved from v1.3.

## Why not copy the reference store one-to-one
The screenshots show another retailer's brand, promotional claims, price cards, ratings and product artwork. The updated BLACKED homepage uses the layout idea (category shortcuts + horizontal discovery + product reference rail) but does not repeat their brand assets or unverified commercial claims. The cropped images are user-provided references; commercial reuse still requires permission or replacement with authorized product photos.

## Priorities still open
- Replace concept illustrations and reference photographs with original or licensed product-only photography.
- Verify actual products, maker documentation, material, dimensions, care instructions, pricing, stock and Indian retail compliance before showing real sale cards.
- If desired, add product-specific metadata and a sort/filter UI once real catalog data exists.
- A real AI virtual try-on needs a dedicated provider/backend using a person photo and a separate garment image. The static manual Fit Studio is not AI.
- A true cart/order flow needs backend inventory and a secure payment/order integration.

## Validation status
Static syntax/HTML/asset checks are included in `TEST-NOTES.md`. This package does not claim a complete browser click-through regression test; test the live GitHub Pages build on Android after deployment.
