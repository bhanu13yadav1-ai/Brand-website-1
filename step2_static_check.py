#!/usr/bin/env python3
"""Static package checks for BLACKED Fusion V1 Step 2. Does not test remote image delivery or deployment."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]; warnings=[]
class CheckHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.ids=[]; self.views=[]; self.pages=[]; self.buttons_without_type=[]; self.img_without_alt=[]; self.local_refs=[]; self.source_images=[]; self.main_count=0; self.nav_labels=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='main':self.main_count+=1
        if 'data-view' in a:self.views.append(a['data-view'])
        if 'data-page' in a:self.pages.append(a['data-page'])
        if tag=='nav' and a.get('aria-label'):self.nav_labels.append(a['aria-label'])
        if tag=='button' and 'type' not in a:self.buttons_without_type.append(a.get('id') or a.get('data-view') or a.get('data-go') or '(unnamed)')
        if tag=='img' and not a.get('alt'):self.img_without_alt.append(a.get('id') or a.get('src') or '(unnamed image)')
        if tag=='img' and a.get('src','').startswith('https://raw.githubusercontent.com/'):self.source_images.append(a['src'])
        for attr in ('src','href'):
            value=a.get(attr)
            if not value or re.match(r'^(?:https?:|mailto:|tel:|data:|blob:|#|//)',value,re.I):continue
            clean=value.split('#',1)[0].split('?',1)[0]
            if clean:self.local_refs.append((tag,attr,clean))

for rel in ['index.html','styles.css','catalog.js','app.js','manifest.webmanifest','sw.js','assets/blacked-icon.svg']:
    if not (ROOT/rel).is_file():errors.append(f'missing required file: {rel}')
parser=CheckHTML()
try:parser.feed((ROOT/'index.html').read_text(encoding='utf-8'));parser.close()
except Exception as exc:errors.append(f'HTML parse failure: {exc}')
if parser.main_count!=1:errors.append(f'expected one main landmark; found {parser.main_count}')
if len(parser.ids)!=len(set(parser.ids)):errors.append('duplicate HTML IDs: '+', '.join(sorted({x for x in parser.ids if parser.ids.count(x)>1})))
if len(parser.pages)!=len(set(parser.pages)):errors.append('duplicate data-page targets')
if set(parser.views)-set(parser.pages):errors.append('nav targets without page: '+', '.join(sorted(set(parser.views)-set(parser.pages))))
if parser.buttons_without_type:errors.append('buttons missing type=button/submit: '+', '.join(parser.buttons_without_type))
if parser.img_without_alt:errors.append('static img missing alt: '+', '.join(parser.img_without_alt))
if 'Main navigation' not in parser.nav_labels:errors.append('named primary nav missing')
for tag,attr,rel in parser.local_refs:
    path=(ROOT/rel).resolve()
    try:path.relative_to(ROOT.resolve())
    except ValueError:errors.append(f'local path escapes project: {rel}');continue
    if not path.exists():errors.append(f'broken local {attr} path in <{tag}>: {rel}')
html=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'styles.css').read_text(encoding='utf-8')
js=(ROOT/'app.js').read_text(encoding='utf-8')
data=(ROOT/'catalog.js').read_text(encoding='utf-8')
for feat,pattern in {
 'catalog/search':r'catalogSearch', 'wishlist persistence':r'persistWishlist', '3-item compare':r'state\.compare\.length\s*>=\s*3',
 'local photo preview':r'createObjectURL\(file\)', 'Fit Passport':r'blacked-fit-passport-v040', 'Fit Detective':r'runFitDetective',
 '8-frame viewer':r'wheelFrames', 'Dildo original wheel':r'spinDildoWheel', 'Plug original wheel':r'spinPlugWheel',
 'Boyfriend original wheel':r'spinBoyWheel', 'Dirty/Wild wheel':r'spinDirtyWheel', 'Sanskari gallery':r'sanskariGrid',
 'Muslim Coming Soon':r'Muslim-Inspired Collection', 'Christian Coming Soon':r'Christian-Inspired Collection',
 'Wellness education':r'Virginity is not a medical diagnosis|virginity is not a medical diagnosis',
 'Brand Studio draft':r'brandDraftForm', 'JSON export':r'exportDrafts', 'no fake publisher':r'Publishing status: BLOCKED'
}.items():
    if not re.search(pattern,html+'\n'+js+'\n'+data,re.I):errors.append(f'feature marker missing: {feat}')
if 'prefers-reduced-motion' not in css:errors.append('reduced-motion support missing')
if ':focus-visible' not in css:errors.append('visible keyboard focus styling missing')
if 'CACHE_NAME' not in (ROOT/'sw.js').read_text(encoding='utf-8'):errors.append('service-worker cache version missing')
try:
    manifest=json.loads((ROOT/'manifest.webmanifest').read_text(encoding='utf-8'))
    for icon in manifest.get('icons',[]):
        if icon['src'].startswith('./') and not (ROOT/icon['src'][2:]).exists():errors.append(f'manifest icon missing: {icon["src"]}')
except Exception as exc:errors.append(f'manifest invalid JSON: {exc}')
asset_map=(ROOT/'assets/ASSET-IMPORT-MAP.csv').read_text(encoding='utf-8') if (ROOT/'assets/ASSET-IMPORT-MAP.csv').exists() else ''
if not asset_map:errors.append('original asset import map missing')
# Remote image count is an explicit warning/blocker until source ZIPs are supplied; never label as local path PASS.
remote_image_urls=len(re.findall(r'https://raw\.githubusercontent\.com/',html+'\n'+data))
report={
 'status':'PASS' if not errors else 'FAIL', 'scope':'Static package consistency only. Does not verify remote image HTTP delivery, real browser/network image results, GitHub Pages or Android hardware.',
 'files':{'html_bytes':len(html.encode('utf-8')),'css_bytes':len(css.encode('utf-8')),'app_js_bytes':len(js.encode('utf-8')),'catalog_js_bytes':len(data.encode('utf-8'))},
 'unique_html_ids':len(parser.ids),'navigation_views':parser.views,'page_views':parser.pages,
 'static_source_image_refs':len(parser.source_images),'remote_image_url_occurrences':remote_image_urls,
 'external_media_blocker':'Original source image binaries are not bundled yet; remote URLs must be replaced with local assets in Step 3.',
 'errors':errors,'warnings':warnings
}
(ROOT/'qa/STEP2-STATIC-RESULTS.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
sys.exit(1 if errors else 0)
