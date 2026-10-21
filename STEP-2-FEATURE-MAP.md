# Step 2 Feature Map — Source → Candidate → Verification

| Feature | Source found in audit | Step 2 candidate location | Current verification | Remaining limitation |
|---|---|---|---|---|
| Main navigation | Brand-website-3 3-tab layout; Brand-website-4f compact views | `index.html`, `js/app.js` | PASS in 54-check in-memory harness | live/Android routing not tested |
| Catalogue and product truth | Brand-website-3 detailed catalogue; Brand-website-4f catalog UI | Innerwear, `js/catalog.js` | 19 cards only; search/filter/sort/detail tested | source roadmap mentions 43 cards; compare and restore remaining entries in Step 3; real SKU/stock/prices unknown |
| Wishlist | both prior apps / source storage key | `js/app.js` | saves both compatible keys in harness | real origin persistence not tested |
| Compare | Brand-website-3 | Innerwear / Compare | three unique items + cap tested | visual comparison with local full-size media pending |
| Fit Studio | Brand-website-3 | Innerwear / Fit Studio | local photo, selected product, overlay, clear tested | remote overlay image can block export until local bundle |
| Fit Passport | Brand-website-3 | Innerwear | old key/inches schema save/clear tested | local origin reload test pending |
| Private Fit Notes | Brand-website-4f (`fitLabel`, `fitNotes`, `blacked31FitNote`) | Innerwear / Personal Fit Notes | restored legacy label+notes, save and clear tested | actual origin reload remains not tested |
| Fit Detective | Brand-website-3 roadmap | Innerwear | interaction checked | general education only, not a size diagnosis |
| Eight-frame viewer | Brand-website-3 360-demo assets | Innerwear | next frame updates tested | generated concept frames, not real 360 scan |
| Original wheel 1 | Brand-website-4f Wellness: `dildoPreference`, `dildoResult` | Wellness / Dildo sizing wheel | spin/reset/18+ gate tested | live/device test pending |
| Original wheel 2 | Brand-website-4f Wellness: `plugPreference`, `plugResult` | Wellness / Butt Plug sizing wheel | preference/spin/reset/18+ gate tested | live/device test pending |
| Original wheel 3 | Brand-website-4f Boyfriend: `boyPreference`, `boyResult` | Boyfriend / size-vibe wheel | spin/reset/18+ gate tested | live/device test pending |
| New Dirty/Wild Wheel | Rule 10 | Wheels view, 10 categories | category/spin/skip/reset tested | actual touch and reduced-motion testing pending |
| Boyfriend/Couples tools | Brand-website-3 / Brand-website-4f | Boyfriend view | date/message/copy/prompt/wheel tested | no booking/chat provider connected |
| Sanskari gallery | Brand-website-3 / delta assets | Sanskari view | 10 cards and preview navigation tested | original binaries not bundled |
| Muslim/Christian previews | master rule 9 | Sanskari view | labelled Coming Soon cards present | not live collections |
| Wellness body education | master rule 7; sources in `docs/RESEARCH-SOURCES.md` | Wellness view | anatomy/hymen/hygiene copy present | medical professional content review not done |
| Brand Studio | original future ask | More / Brand Studio | create/delete/export JSON tested | drafts remain local; no GitHub publishing |
| Image fallback/service worker | issues found across source listings | shared image helper, `sw.js` | forced broken-image UI tested | real image binary/network fix pending |

The source locations above reflect the accessible current repository listing/code, not a live deployed webpage.
