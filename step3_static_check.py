#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import json,re,hashlib,sys
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
errors=[];warnings=[]
class P(HTMLParser):
 def __init__(self): super().__init__();self.ids=[];self.refs=[];self.img_alt=[];self.views=[];self.pages=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if a.get('id'): self.ids.append(a['id'])
  if a.get('data-view'): self.views.append(a['data-view'])
  if a.get('data-page'): self.pages.append(a['data-page'])
  if t=='img':
   if not a.get('alt'): self.img_alt.append(a.get('src','(no alt)'))
   src=a.get('src','')
   if src and not re.match(r'^(https?:|data:|blob:|#)',src,re.I): self.refs.append(src.split('?')[0].split('#')[0])
  for k in ('src','href'):
   v=a.get(k,'')
   if v and not re.match(r'^(https?:|data:|blob:|mailto:|tel:|#)',v,re.I):self.refs.append(v.split('?')[0].split('#')[0])
required=['index.html','styles.css','catalog.js','app.js','sw.js','manifest.webmanifest','assets/blacked-icon.svg']
for p in required:
 if not (ROOT/p).is_file():errors.append('required root file missing: '+p)
html=(ROOT/'index.html').read_text(encoding='utf-8');css=(ROOT/'styles.css').read_text(encoding='utf-8');js=(ROOT/'app.js').read_text(encoding='utf-8');cat=(ROOT/'catalog.js').read_text(encoding='utf-8');sw=(ROOT/'sw.js').read_text(encoding='utf-8')
p=P();p.feed(html)
if len(p.ids)!=len(set(p.ids)): errors.append('duplicate HTML IDs')
if set(p.views)-set(p.pages): errors.append('navigation targets without page: '+str(sorted(set(p.views)-set(p.pages))))
if p.img_alt: errors.append('img without alt: '+str(p.img_alt))
for r in set(p.refs):
 if r.startswith(('https:','http:','//')):continue
 if not (ROOT/r).exists():errors.append('broken local HTML resource: '+r)
local_gallery_assets = [
 ('assets/muslim-collection/muslim-shaam-e-noor.webp','Muslim'),
 ('assets/muslim-collection/muslim-shaam-ki-roshni.webp','Muslim'),
 ('assets/muslim-collection/muslim-noor-ka-nasha.webp','Muslim'),
 ('assets/muslim-collection/muslim-shaam-se-raat-tak.webp','Muslim'),
 ('assets/muslim-collection/muslim-tradition-outside-desire-inside.webp','Muslim'),
 ('assets/muslim-collection/muslim-elegance-begins-within.webp','Muslim'),
 ('assets/christian-collection/christian-grace-has-never-looked-so-bold.webp','Christian'),
 ('assets/sanskari-collection/sanskari-outside-dangerous-new.webp','Sanskari'),
 ('assets/sanskari-collection/sanskari-outside-bold-within.webp','Sanskari')
]
for rel,kind in local_gallery_assets:
 f=ROOT/rel
 if not f.is_file(): errors.append(f'{kind} artwork missing: {rel}')
 else:
  try:
   with Image.open(f) as im: im.verify()
  except Exception as e: errors.append(f'invalid {kind} artwork {rel}: '+str(e))
for original in [
 'assets/supplied/collection-additions/1000200454(2).jpg',
 'assets/supplied/collection-additions/1000200455(3).jpg',
 'assets/supplied/collection-additions/1000200453(2).png',
 'assets/supplied/collection-additions/1000200456(2).jpg',
 'assets/supplied/collection-additions/1000200479.png'
]:
 if not (ROOT/original).is_file(): errors.append('preserved source original missing: '+original)
if not re.search(r'href="\./styles\.css\?v=step3-3"',html):errors.append('index does not use versioned root stylesheet path')
if not re.search(r'src="\./catalog\.js\?v=step3-3"',html) or not re.search(r'src="\./app\.js\?v=step3-3"',html):errors.append('index does not use versioned root script paths')
if 'muslimCollection' not in cat or "renderGallery(C.muslimCollection,'muslimGrid'" not in js:errors.append('Muslim gallery is not wired to gallery/lightbox code')
if 'christianCollection' not in cat or "renderGallery(C.christianCollection,'christianGrid'" not in js:errors.append('Christian Coming Soon gallery is not wired to gallery/lightbox code')
if cat.count('assets/sanskari-collection/') < 2: errors.append('two new Sanskari images are not mapped locally')
if 'blacked-fusion-v1-step3-3' not in sw:errors.append('service worker cache version not updated')
if 'oldFusionNames' not in sw or 'cache.match(event.request)' not in sw:errors.append('service worker stale-cache isolation is missing')
remote_literals=len(re.findall(r'https://raw\.githubusercontent\.com/',html+'\n'+cat))
registry_path=ROOT/'assets'/'registry'/'REMOTE-ASSET-REGISTRY.json'
registry=json.loads(registry_path.read_text(encoding='utf-8')) if registry_path.exists() else {}
legacy_count=int(registry.get('audit_result',{}).get('catalogue_image_refs',65))
report={'status':'PASS' if not errors else 'FAIL','scope':'Static local paths and decoding of user-supplied Muslim, Christian and Sanskari collection assets. Does not validate actual live HTTP, remote legacy binaries, GitHub Pages or device browser.','root_entry_files':required,'unique_html_ids':len(p.ids),'nav_views':p.views,'page_views':p.pages,'missing_local_refs':errors,'legacy_remote_image_reference_count':legacy_count,'raw_github_url_literal_occurrences_in_html_and_catalog':remote_literals,'legacy_remote_binary_bundle_status':'BLOCKED — repository source ZIPs unavailable','new_collection_assets':'PASS' if not any('artwork' in e or 'preserved source original' in e for e in errors) else 'FAIL', 'local_collection_asset_count':len(local_gallery_assets)}
(ROOT/'qa'/'STEP3-STATIC-RESULTS.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps(report,indent=2,ensure_ascii=False))
sys.exit(1 if errors else 0)
