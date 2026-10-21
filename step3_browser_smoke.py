#!/usr/bin/env python3
"""In-memory Chromium smoke tests for the exact Step 2 HTML/CSS/JS.
Remote image URLs are intercepted and supplied with a test fixture image. This is not a real network/media/deployment test.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
from io import BytesIO
import json, re, sys, base64
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'styles.css').read_text(encoding='utf-8')
catalog=(ROOT/'catalog.js').read_text(encoding='utf-8')
app=(ROOT/'app.js').read_text(encoding='utf-8')
# Inline the exact current sources to test app logic despite this environment's localhost/file navigation restrictions.
html=re.sub(r'<link rel="stylesheet" href="[^"]+"[^>]*>', '<style>'+css+'</style>', html, count=1)
html=html.replace('  <link rel="manifest" href="manifest.webmanifest">','')
html=re.sub(r'\s*<script src="\./catalog\.js(?:\?[^\"]*)?" defer></script>','',html)
html=re.sub(r'\s*<script src="\./app\.js(?:\?[^\"]*)?" defer></script>','',html)
# Embed the exact locally bundled collection WebPs into this in-memory page so they decode without relying on file:// URLs.
local_gallery_assets = {
    'assets/muslim-collection/muslim-shaam-e-noor.webp': ROOT/'assets/muslim-collection/muslim-shaam-e-noor.webp',
    'assets/muslim-collection/muslim-shaam-ki-roshni.webp': ROOT/'assets/muslim-collection/muslim-shaam-ki-roshni.webp',
    'assets/muslim-collection/muslim-noor-ka-nasha.webp': ROOT/'assets/muslim-collection/muslim-noor-ka-nasha.webp',
    'assets/muslim-collection/muslim-shaam-se-raat-tak.webp': ROOT/'assets/muslim-collection/muslim-shaam-se-raat-tak.webp',
    'assets/muslim-collection/muslim-tradition-outside-desire-inside.webp': ROOT/'assets/muslim-collection/muslim-tradition-outside-desire-inside.webp',
    'assets/muslim-collection/muslim-elegance-begins-within.webp': ROOT/'assets/muslim-collection/muslim-elegance-begins-within.webp',
    'assets/christian-collection/christian-grace-has-never-looked-so-bold.webp': ROOT/'assets/christian-collection/christian-grace-has-never-looked-so-bold.webp',
    'assets/sanskari-collection/sanskari-outside-dangerous-new.webp': ROOT/'assets/sanskari-collection/sanskari-outside-dangerous-new.webp',
    'assets/sanskari-collection/sanskari-outside-bold-within.webp': ROOT/'assets/sanskari-collection/sanskari-outside-bold-within.webp',
}
for url_path, asset_path in local_gallery_assets.items():
    data_url='data:image/webp;base64,'+base64.b64encode(asset_path.read_bytes()).decode('ascii')
    catalog=catalog.replace(url_path, data_url)
storage_shim="<script>Object.defineProperty(window,'localStorage',{configurable:true,value:(()=>{const m=new Map([['blacked31FitNote',JSON.stringify({label:'Legacy saved fit note',notes:'Existing note survives migration.'})]]);return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()};})()});</script>"
html=html.replace('</body>',storage_shim+'\n<script>'+catalog+'</script>\n<script>'+app+'</script>\n</body>',1)
# Renderable image fixture for UI tests only.
img=Image.new('RGB',(160,210),(62,35,58)); d=ImageDraw.Draw(img); d.ellipse((38,30,122,114),fill=(255,181,210)); d.rectangle((28,105,132,190),fill=(232,204,145))
buf=BytesIO();img.save(buf,format='PNG');png=buf.getvalue()
report={'scope':'In-memory Chromium UI smoke tests for Step 3.3 collection updates. All raw GitHub image URLs are intercepted and replaced with a test PNG, so this does not verify genuine image delivery, image contents, GitHub Pages, service worker deployment or physical Android.','viewport_results':[],'tests':{},'console_errors':[],'expected_fixture_errors':[],'page_errors':[],'failed_requests':[],'network_image_fixture':'test PNG supplied for every raw.githubusercontent.com image path'}
def record(name, ok, detail=''):
    report['tests'][name]={'result':'PASS' if ok else 'FAIL','detail':detail}
    if not ok: raise AssertionError(f'{name} failed: {detail}')
try:
  with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':390,'height':844},ignore_https_errors=True)
    def image_route(route):
      if 'missing-test-image' in route.request.url:
        route.fulfill(status=404,content_type='text/plain',body='test not found')
      else:
        route.fulfill(status=200,content_type='image/png',body=png,headers={'access-control-allow-origin':'*','cache-control':'no-store'})
    context.route('https://raw.githubusercontent.com/**',image_route)
    page=context.new_page()
    page.on('console',lambda msg: (report['expected_fixture_errors'] if '404 (Not Found)' in msg.text else report['console_errors']).append(msg.text) if msg.type=='error' else None)
    page.on('pageerror',lambda exc: report['page_errors'].append(str(exc)))
    page.on('requestfailed',lambda req: report['failed_requests'].append({'url':req.url,'failure':req.failure}))
    page.set_content(html,wait_until='load')
    page.wait_for_selector('#catalogGrid .product-card', state='attached')
    page.screenshot(path=str(ROOT/'qa'/'preview-mobile-390.png'),full_page=True)
    record('initial_render',page.title()=='BLACKED Fusion V1 — Step 3.3 Collection Expansion' and page.locator('#catalogGrid .product-card').count()==19 and page.evaluate('getComputedStyle(document.body).backgroundColor')=='rgb(16, 11, 16)',f"title={page.title()}, background={page.evaluate('getComputedStyle(document.body).backgroundColor')}, catalogue cards={page.locator('#catalogGrid .product-card').count()}")

    # Responsive check at all requested widths for every main section.
    for width,height in [(320,760),(360,800),(390,844),(430,900),(1440,1000)]:
      page.set_viewport_size({'width':width,'height':height})
      page.wait_for_timeout(60)
      dimensions=page.evaluate('''() => ({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth})''')
      dimensions['width']=width;dimensions['no_horizontal_overflow']=dimensions['document']<=width+1 and dimensions['body']<=width+1
      report['viewport_results'].append(dimensions)
    record('responsive_no_overflow',all(v['no_horizontal_overflow'] for v in report['viewport_results']),str(report['viewport_results']))

    # Navigation, hash routing and mobile menu.
    page.set_viewport_size({'width':390,'height':844})
    page.locator('#menuToggle').click();record('mobile_menu_opens',page.locator('#primaryNav').evaluate('(el)=>getComputedStyle(el).display')!='none' and page.locator('#menuToggle').get_attribute('aria-expanded')=='true')
    page.locator('[data-view="innerwear"]').click();record('nav_innerwear',page.locator('#innerwear').is_visible() and page.locator('[data-view="innerwear"]').get_attribute('aria-current')=='page')
    record('legacy_fit_note_restored',page.locator('#fitNoteLabel').input_value()=='Legacy saved fit note' and page.locator('#fitNotes').input_value()=='Existing note survives migration.')
    page.locator('#fitNoteLabel').fill('QA Fit Note');page.locator('#fitNotes').fill('This note should be saved with the legacy key.');page.locator('#saveFitNote').click()
    record('legacy_fit_note_save',page.evaluate("() => {const n=JSON.parse(localStorage.getItem('blacked31FitNote')||'null');return !!n&&n.label==='QA Fit Note'&&n.notes.includes('legacy key')}"))
    page.locator('#clearFitNote').click();record('legacy_fit_note_clear',page.evaluate("() => localStorage.getItem('blacked31FitNote')===null"))
    page.locator('#menuToggle').click(); page.locator('[data-view="sanskari"]').click();record('nav_sanskari',page.locator('#sanskari').is_visible() and page.locator('#sanskariGrid .gallery-card').count()==12 and page.locator('#muslimGrid .gallery-card').count()==6)
    record('religion_previews',page.get_by_text('Muslim-Inspired Collection · Noor Edit',exact=True).is_visible() and page.get_by_text('Christian-Inspired Collection',exact=True).is_visible() and page.locator('#muslimGrid .gallery-card').count()==6 and page.locator('#christianGrid .gallery-card').count()==1)
    record('muslim_six_cards_present',page.locator('#muslimGrid .gallery-card').count()==6 and page.locator('#muslimGrid img').count()==6)
    page.wait_for_function("Array.from(document.querySelectorAll('#muslimGrid img')).length===6 && Array.from(document.querySelectorAll('#muslimGrid img')).every(i=>i.complete&&i.naturalWidth>0)")
    record('muslim_local_images_decode',page.locator('#muslimGrid img').evaluate_all('(imgs)=>imgs.length===6 && imgs.every(i=>i.complete&&i.naturalWidth>0)'))
    page.evaluate("document.querySelector('#toast')?.classList.add('hidden')")
    page.screenshot(path=str(ROOT/'qa'/'preview-muslim-390.png'),full_page=True)
    page.locator('#muslimGrid [data-gallery-index="0"]').click();record('muslim_preview_opens_lightbox',page.locator('#lightboxDialog').evaluate('(el)=>el.open') and page.locator('#lightboxTitle').inner_text()=='Shaam-e-Noor');page.locator('[data-close-dialog="lightboxDialog"]').click()
    page.locator('#muslimGrid [data-gallery-index="4"]').click();record('muslim_new_artwork_lightbox',page.locator('#lightboxTitle').inner_text()=='Tradition Outside, Desire Inside');page.locator('[data-close-dialog="lightboxDialog"]').click()
    record('christian_coming_soon_artwork_present',page.locator('#christianGrid .gallery-card').count()==1 and page.locator('#christianGrid img').count()==1)
    page.locator('#christianGrid [data-gallery-index="0"]').click();record('christian_artwork_lightbox',page.locator('#lightboxTitle').inner_text()=='Grace Has Never Looked So Bold');page.locator('[data-close-dialog="lightboxDialog"]').click()
    record('new_sanskari_artworks_present',page.locator('#sanskariGrid .gallery-card').count()==12 and page.locator('#sanskariGrid').get_by_text('Sanskari Outside, Bold Within').count()==1)

    # Catalog search, category filter, sort and reset.
    page.locator('#menuToggle').click(); page.locator('[data-view="innerwear"]').click()
    page.locator('#catalogSearch').fill('Midnight')
    search_count=page.locator('#catalogGrid .product-card').count()
    record('catalog_search',search_count>=2 and search_count<19,f'matching cards={search_count}')
    page.locator('#catalogSearch').fill('')
    page.locator('#catalogCategory').select_option('Sanskari')
    record('catalog_category_filter',page.locator('#catalogGrid .product-card').count()==4,f"cards={page.locator('#catalogGrid .product-card').count()}")
    page.locator('#catalogCategory').select_option('all')
    page.locator('#catalogSort').select_option('name-asc')
    first=page.locator('#catalogGrid .product-card h3').first.inner_text()
    record('catalog_sort',first=='Aankhein Neeche',f'first={first}')
    page.locator('#clearCatalogFilters').click();record('catalog_reset',page.locator('#catalogGrid .product-card').count()==19)

    # Wishlist key compatibility and persistence.
    page.locator('#catalogGrid [data-save="move"]').click()
    record('wishlist_save',page.locator('#wishlistGrid [data-product-id="move"]').count()==1 and '1 saved' in page.locator('#wishlistCount').inner_text())
    record('wishlist_local_storage_key',page.evaluate('''() => {const a=JSON.parse(localStorage.getItem('blacked-fit-studio-wishlist-v03')||'[]');const b=JSON.parse(localStorage.getItem('blacked31Wishlist')||'[]');return a.includes('move')&&b.includes('move')}'''))

    # Compare limit, details modal, and demo bag.
    for pid in ['move','yoga','redlace']:
      page.locator(f'#catalogGrid [data-compare="{pid}"]').click()
    record('compare_three_items',page.locator('#compareGrid .compare-item').count()==3)
    page.locator('#catalogGrid [data-compare="stretch"]').click()
    record('compare_max_three',page.locator('#compareGrid .compare-item').count()==3 and 'three' in page.locator('#toast').inner_text().lower())
    page.locator('#catalogGrid [data-details="signature"]').first.click()
    record('product_detail_dialog',page.locator('#productDialog').evaluate('(el)=>el.open') and page.locator('#productDialogTitle').inner_text()=='Black Comfort Set')
    page.locator('#addDemoBag').click()
    record('demo_bag',page.locator('#bagCount').inner_text()=='1 item' and page.locator('#bagPanel').get_by_text('Black Comfort Set').count()==1)
    page.locator('[data-close-dialog="productDialog"]').click()

    # Fit Studio and local photo upload; overlay exists only when matched.
    page.locator('#fitPhotoUpload').set_input_files({'name':'local-test.png','mimeType':'image/png','buffer':png})
    page.wait_for_timeout(100)
    record('local_photo_preview',not page.locator('#fitUserPhoto').is_hidden() and page.locator('#fitStageStatus').inner_text().lower().find('local photo')>=0)
    page.locator('#catalogGrid [data-details="blacklace"]').first.click()
    page.locator('#fitProductFromDialog').click()
    record('selected_product_fit_state',page.locator('#fitProductLabel').inner_text()=='Black Lace Cut-Out Set')
    record('product_specific_overlay',not page.locator('#fitOverlayImage').is_hidden() and 'illustrative overlay' in page.locator('#fitStageStatus').inner_text().lower())
    page.locator('#resetOverlay').click();page.locator('#clearFitPhoto').click()
    record('clear_local_photo',page.locator('#fitUserPhoto').is_hidden() and page.locator('#fitStageStatus').inner_text().lower().find('photo cleared')>=0)

    # Fit Passport opt-in, validation and clearing.
    page.locator('#fitBust').fill('90');page.locator('#fitUnderbust').fill('80');page.locator('#saveFitPassport').check();page.locator('#saveFitNotes').click()
    record('fit_passport_saved',page.evaluate("() => {const p=JSON.parse(localStorage.getItem('blacked-fit-passport-v040')||'null');return !!p&&p.unit==='in'&&p.values.bust>0}"))
    page.locator('#clearFitPassport').click();record('fit_passport_clear',page.evaluate("() => localStorage.getItem('blacked-fit-passport-v040')===null"))
    page.locator('#runFitDetective').click();record('fit_detective',len(page.locator('#fitDetectiveResult').inner_text())>30)
    page.locator('#angleNext').click();record('eight_frame_viewer',page.locator('#angleLabel').inner_text().startswith('02 / 08'))

    # Size converter and two Wellness wheels.
    page.locator('#menuToggle').click(); page.locator('[data-view="wellness"]').click()
    page.locator('#measureValue').fill('90')
    record('cm_in_converter', '35.43 in' in page.locator('#measureResult').inner_text())
    page.locator('#spinDildoWheel').click();record('wellness_wheel_age_gate', '18 or older' in page.locator('#toast').inner_text())
    page.locator('#wellnessAdultConfirm').check()
    page.locator('#spinDildoWheel').click();record('original_dildo_wheel',page.locator('#dildoResult').inner_text().lower().find('selected')>=0 and 'rotate(' in page.locator('#dildoWheelVisual').get_attribute('style'))
    page.locator('#resetDildoWheel').click();record('dildo_wheel_reset', 'Round reset' in page.locator('#dildoResult').inner_text() and page.locator('#dildoPreference').input_value()=='small')
    page.locator('#plugPreference').select_option('wide');page.locator('#spinPlugWheel').click();record('original_plug_wheel',page.locator('#plugResult').inner_text().lower().find('wider')>=0 and 'rotate(' in page.locator('#plugWheelVisual').get_attribute('style'))
    page.locator('#resetPlugWheel').click();record('plug_wheel_reset', 'Round reset' in page.locator('#plugResult').inner_text() and page.locator('#plugPreference').input_value()=='compact')
    record('wellness_education',page.get_by_text('Hymen and “virginity testing” myths',exact=True).count()==1 and page.get_by_text('External hygiene basics',exact=True).count()==1)
    record('wellness_reference_gallery',page.locator('#wellnessGallery .gallery-card').count()==14)

    # Boyfriend date, message and original wheel location 3.
    page.locator('#menuToggle').click(); page.locator('[data-view="boyfriend"]').click()
    page.locator('#makeDate').click();record('date_planner',len(page.locator('#dateResult').inner_text())>35)
    page.locator('#makeMessage').click();record('message_generator',len(page.locator('#messageResult').inner_text())>10)
    page.locator('#copyMessage').click();record('message_copy_action',len(page.locator('#messageCopyStatus').inner_text())>0)
    page.locator('#spinBoyWheel').click();record('boyfriend_wheel_age_gate','18 or older' in page.locator('#toast').inner_text())
    page.locator('#boyAdultConfirm').check();page.locator('#spinBoyWheel').click();first_boy_rotation=page.locator('#boyWheelVisual').get_attribute('style');record('original_boyfriend_wheel',len(page.locator('#boyResult').inner_text())>40 and 'rotate(' in first_boy_rotation)
    page.locator('#spinBoyWheel').click();record('boyfriend_wheel_repeat',page.locator('#boyWheelVisual').get_attribute('style')!=first_boy_rotation)
    page.locator('#resetBoyWheel').click();record('boyfriend_wheel_reset','Round reset' in page.locator('#boyResult').inner_text() and page.locator('#boyPreference').input_value()=='gentle')
    page.locator('#nextConversationPrompt').click();record('conversation_prompts',len(page.locator('#conversationPrompt').inner_text())>10)
    page.locator('#fantasyConsent').check();page.locator('#generateFantasy').click();record('secret_fantasy_prompt',len(page.locator('#fantasyResult').inner_text())>20 and 'Generated locally' in page.locator('#fantasyStatus').inner_text())

    # New Dirty/Wild wheel categories, spin, skip, reset.
    page.locator('#menuToggle').click(); page.locator('[data-view="wheels"]').click()
    record('dirty_wild_ten_categories',page.locator('#dirtyCategoryButtons .category-chip').count()==10)
    page.locator('#dirtyAdultConfirm').check();page.locator('[data-dirty-category="dark"]').click();page.locator('#spinDirtyWheel').click()
    first_dirty_prompt=page.locator('#dirtyWheelResult').inner_text()
    record('dirty_wild_category_result','DARK ROMANCE & MYSTERY' in first_dirty_prompt.upper() and 'OPTIONAL PROMPT' in first_dirty_prompt.upper())
    page.locator('#spinDirtyWheel').click();record('dirty_wild_avoids_immediate_repeat',page.locator('#dirtyWheelResult').inner_text()!=first_dirty_prompt)
    page.locator('#skipDirtyPrompt').click();record('dirty_wild_skip', 'Skipped or replaced' in page.locator('#dirtyWheelStatus').inner_text())
    page.locator('#resetDirtyWheel').click();record('dirty_wild_reset','Choose a category and spin' in page.locator('#dirtyWheelResult').inner_text())

    # Brand Studio local draft create/export/delete and checkpoint download.
    page.locator('#menuToggle').click(); page.locator('[data-view="more"]').click()
    page.locator('#draftTitle').fill('QA draft');page.locator('#draftSection').select_option('sanskari');page.locator('#draftDescription').fill('Local draft test only.');page.locator('#brandDraftForm button[type="submit"]').click()
    record('brand_studio_local_draft',page.locator('#draftList').get_by_text('QA draft',exact=True).count()==1 and 'not published' in page.locator('#draftStatus').inner_text().lower())
    with page.expect_download() as dl: page.locator('#exportDrafts').click()
    record('brand_studio_json_export',dl.value.suggested_filename=='blacked-brand-studio-drafts.json',dl.value.suggested_filename)
    page.locator('[data-draft-delete]').click();record('brand_studio_delete',page.locator('#draftList').get_by_text('QA draft',exact=True).count()==0)
    with page.expect_download() as dl2: page.locator('#downloadCheckpoint').click()
    record('checkpoint_download',dl2.value.suggested_filename=='BLACKED-V1-STEP3-HANDOFF.txt')

    # Test the error fallback on an intentionally missing image. This is not a claim the real source image failed.
    page.evaluate("""() => { const d=document.querySelector('#lightboxDialog'); if(!d.open)d.showModal(); const img=document.querySelector('#lightboxImage'); img.hidden=false; img.src='https://raw.githubusercontent.com/missing-test-image.webp'; }""")
    page.wait_for_timeout(150)
    record('missing_image_fallback',page.locator('#lightboxImage').is_hidden() and not page.locator('#lightboxDialog .media-fallback').is_hidden())

    # Image refs are mocked on purpose, so no raw-host failed requests should occur except the intentional 404 route.
    browser.close()
except Exception as exc:
    report['runtime_error']=f'{type(exc).__name__}: {exc}'
try:
  report['overall']='PASS' if not report.get('runtime_error') and all(v['result']=='PASS' for v in report['tests'].values()) and not report['page_errors'] and not report['console_errors'] else 'FAIL'
except Exception: report['overall']='FAIL'
(ROOT/'qa/STEP3-BROWSER-RESULTS.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
if report['overall']!='PASS':sys.exit(1)
