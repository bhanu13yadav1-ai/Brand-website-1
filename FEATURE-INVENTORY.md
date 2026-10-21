# Feature Inventory & Source Mapping

Status meanings: **FOUND** = identifiable in source/code/docs; **MAPPED** = planned for migration; **NOT TESTED** = runtime behavior is not verified; **NEW** = new requirement to build.

| Feature / area | Primary source | Status / migration requirement |
|---|---|---|
| Primary navigation / separated areas | Brand-website-3 (3 tabs); Brand-website-4f (6 views) | MAPPED — preserve all content but rationalize nav so phone users can locate it quickly. |
| Innerwear catalogue, search, filters and sort | Brand-website-3 and 4f | FOUND/MAPPED — merge one product data model; verify every path and filter. |
| Product details and image gallery | Brand-website-3 | FOUND/MAPPED — exact selected product/card/title/gallery must stay synchronized. |
| Wishlist / saved styles | Brand-website-3 and 4f | FOUND/MAPPED — preserve existing local data keys; storage migration needs explicit audit. |
| Compare up to three styles | Brand-website-3 | FOUND/MAPPED — no duplicate IDs; honest unknown fields. |
| Demo bag and offer/wheels | Brand-website-4f | FOUND/MAPPED — demo prices/rewards clearly marked non-redeemable; no real checkout implied. |
| Fit Studio / local photo preview / manual overlay | Brand-website-3 | FOUND/MAPPED — canonical selected product; local photo; product-specific cutout only. |
| Fit Passport / Fit Detective / size chart | Brand-website-3 | FOUND/MAPPED — no invented chart/size; local-only behavior described accurately. |
| Eight-frame product-angle concept viewer | Brand-website-3 | FOUND/MAPPED — concept demo, not a real 3D scan. |
| Original wheel 1 | Brand-website-4f `view-wellness`; `dildoPreference`, `dildoExperience` | FOUND/MAPPED/NOT TESTED — Dildo sizing wheel; individual functional test required. |
| Original wheel 2 | Brand-website-4f `view-wellness`; `plugPreference`, `plugExperience` | FOUND/MAPPED/NOT TESTED — Butt Plug sizing wheel; individual functional test required. |
| Original wheel 3 | Brand-website-4f `view-boyfriend`; `boyPreference`, `boyResult` | FOUND/MAPPED/NOT TESTED — Boyfriend size/deal wheel; individual functional test required. |
| New Dirty/Wild Wheel (18+) | New requirement | NEW — separate mode, category select, spin/result/reset, no coercive prompts. |
| Boyfriend/Plus-One/date planner | Brand-website-3 and 4f | FOUND/MAPPED — no real companion listings/bookings; keep consent and safety choices. |
| Message helper / flirty prompts | Brand-website-4f | FOUND/MAPPED — categorized messages, copy works, no fake chat/privacy. |
| Secret fantasy/couple prompts | Brand-website-3 and 4f docs/UI | FOUND/MAPPED — consenting adults, optional, non-graphic, boundaries/skip/stop. |
| Sanskari campaign gallery | Brand-website-3 + delta package | FOUND/MAPPED — each real image its own card; no contact sheet masquerading as distinct source assets. |
| Muslim-inspired collection preview | New requirement | NEW — Coming Soon, respectful art and clear unavailable state. |
| Christian-inspired collection preview | New requirement | NEW — Coming Soon, respectful art and clear unavailable state. |
| Wellness 18+ gate / education | Brand-website-3 and 4f | FOUND/MAPPED — self-attestation only, not formal verification. |
| Size Guide / body education | Brand-website-3 roadmap + new requirement | MAPPED — source-backed, review-dated, clearly distinct from marketing. |
| Service worker / offline / app icons | Brand-website-4f and delta | FOUND/MAPPED — rebuild cache list against final output; avoid stale-cache broken paths. |
| Secure GitHub publishing / Brand Studio | Not found as working source feature | NEW — requires protected workflow/backend; secret never belongs in public JS. |
| Analytics / admin | No verified production backend observed in reviewed scope | NOT FOUND / not promised — define consent, purpose and auth if requested later. |

## Image source categories

1. Campaign poster / composite artwork — display as campaign reference; may include text/CTA baked into the image.
2. Editorial/look reference — use in its own section, label as reference.
3. Product-only image — use for product gallery only if the file truly shows the intended item.
4. Transparent garment cutout/overlay — only use for its mapped product in Fit Studio.
5. 360 frames — currently documented as generated concept frames, not a verified physical product scan.
6. Wellness supplier/reference images — do not claim supplier, stock, dimensions or technical specifications unless independently confirmed.

Never convert missing file into an unrelated image fallback. A fallback should clearly say image unavailable or show a neutral branded error state; it must not imply a wrong item is the selected product.
