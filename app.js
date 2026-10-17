(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const ASSET_BASE = 'https://bhanu13yadav1-ai.github.io/Brand-website-1/';
  const image = file => file.startsWith('assets/') ? file : ASSET_BASE + file;
  const products = [
    {id:'signature', name:'Black Comfort Set', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-09-blacked-comfort-set.png', desc:'Comfort-led black matching-set campaign direction.', note:'Campaign visual; exact garment SKU and stock are not confirmed.', concept:false, material:'Product composition and care instructions must be confirmed.', fit:true},
    {id:'move', name:'Move Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-01-blacked-move-together.png', desc:'A movement-inspired look built around easy, everyday confidence.', note:'Campaign visual, not a verified catalogue SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'yoga', name:'Yoga Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-02-blacked-yoga-together.png', desc:'A warm studio campaign visual with a movement-inspired mood.', note:'Campaign visual only; not a separate verified product SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'redlace', name:'Red Lace Bodysuit', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-03-red-lace-bodysuit-reference.png', desc:'Red lace and strappy construction inspiration from your supplied reference.', note:'Reference only. Verify image-use rights and actual product details before selling.', concept:true, material:'Not a confirmed BLACKED product. Material and construction not verified.', fit:true},
    {id:'stretch', name:'Movement & Stretch', category:'lingerie', label:'SHOOT REFERENCE', image:'ref-04-movement-stretch-reference.png', desc:'A movement-focused shoot reference for a comfort-led brand direction.', note:'Reference image only. Product identity and usage rights must be confirmed.', concept:true, material:'Not a verified product listing.', fit:true},
    {id:'blacklace', name:'Black Lace Cut-Out Set', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-05-black-lace-cutout-reference.png', desc:'Black lace pattern, cut-out and matching-set style direction.', note:'Reference image includes other-brand text; do not list as BLACKED stock without rights and a verified product.', concept:true, material:'Material and garment construction not verified.', fit:true},
    {id:'velvet', name:'Velvet Lace Set', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-06-velvet-lace-reference.png', desc:'Pink velvet with black-lace detailing as a supplied style reference.', note:'Reference only. Confirm product identity, design rights and specifications.', concept:true, material:'Material and garment construction not verified.', fit:true},
    {id:'rose', name:'Rose Strap Mannequin Set', category:'lingerie', label:'PRODUCT DETAIL REFERENCE', image:'ref-07-rose-strap-mannequin-reference.jpg', desc:'Red straps with rose and pearl-inspired decorative details.', note:'Original screenshot reference only; verify rights and the complete garment before listing.', concept:true, material:'Material and full garment details not confirmed.', fit:true},
    {id:'butterfly', name:'Pink Butterfly Lace Detail', category:'lingerie', label:'DETAIL REFERENCE', image:'ref-08-pink-butterfly-detail-reference.jpg', desc:'Pink butterfly-inspired lace detailing reference.', note:'Detail reference only. This image does not verify a complete product or SKU.', concept:true, material:'Material and full garment details not confirmed.', fit:true},
    {id:'together', name:'Better Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-10-blacked-better-together.png', desc:'A warm premium lifestyle campaign direction for a black matching set.', note:'Campaign visual, not a separate verified product SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'sculpt', name:'Midnight Sculpt', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-11-midnight-sculpt-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'Charcoal tones with contrasting black lace details.', note:'Concept preview only. Production status and stock are not confirmed.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'midnight', name:'Midnight Lace', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-12-midnight-lace-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'An elegant black lace and adjustable-strap concept.', note:'Concept preview only. Not confirmed for sale.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'scarlet', name:'Scarlet Satin', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-13-scarlet-satin-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'A deep berry satin-and-lace matching-set concept.', note:'Concept preview only. Final construction and stock are not confirmed.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'ivory', name:'Ivory Bloom', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-14-ivory-bloom-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'Ivory tones with delicate floral-inspired detailing.', note:'Concept preview only. Not confirmed for sale.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'syrn-demi', name:'Forever Yours Demi Bra', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-forever-yours.svg', desc:'A separate-brand style reference for a smooth-cup demi silhouette.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/forever-yours-lightly-lined-smooth-demi-bra-bab'},
    {id:'syrn-balconette', name:'Forget Me Not Balconette', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-forget-me-not.svg', desc:'A separate-brand style reference for an unlined balconette shape.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/forget-me-not-unlined-balconette-bra-dwm'},
    {id:'syrn-bodysuit', name:'Fantasy Lace Halter Bodysuit', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-fantasy-bodysuit.svg', desc:'A separate-brand style reference for a floral-lace halter direction.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/the-fantasy-lace-halter-bodysuit-afd'},
    {id:'dildo', name:'Silicone Dildo', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/silicone-dildo.svg', desc:'A simple personal-wellness product concept in a smooth, easy-to-clean form.', note:'Illustration only. Verify the actual supplier, intended use, dimensions and material specification before offering it for sale.', concept:true, material:'Only list as body-safe silicone if supplier documentation verifies the material.', fit:false},
    {id:'plug', name:'Flared-Base Butt Plug', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/flared-base-plug.svg', desc:'A compact design direction featuring a visible flared base.', note:'Illustration only. The final product must have a secure, appropriately designed flared base and clear size information.', concept:true, material:'Material and dimensions are not yet verified. Follow maker instructions.', fit:false},
    {id:'pulse', name:'Mini Pulse Massager', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/bullet-massager.svg', desc:'A small personal massager concept with a discreet silhouette.', note:'Illustration only. Check supplier safety, battery, charging and waterproof claims before selling.', concept:true, material:'Actual material, charging and water-resistance specifications are not confirmed.', fit:false},
    {id:'lube', name:'Water-Based Lubricant', category:'care', label:'CARE ESSENTIAL CONCEPT', image:'assets/lube-care.svg', desc:'A concept entry for a water-based personal lubricant.', note:'Concept entry only. Confirm the formula, ingredients, expiry date, compatibility and regulatory labelling with a reputable supplier.', concept:true, material:'Formula, ingredients and compatibility are not yet verified.', fit:false},
    {id:'cleaner', name:'Intimate Toy Cleaner', category:'care', label:'CARE ESSENTIAL CONCEPT', image:'assets/toy-cleaner.svg', desc:'A care accessory concept for product-specific cleaning routines.', note:'Concept entry only. Cleaning instructions must match each toy material and manufacturer guidance.', concept:true, material:'Ingredients and material compatibility need supplier confirmation.', fit:false},
    {id:'pouch', name:'Discreet Storage Pouch', category:'care', label:'ACCESSORY CONCEPT', image:'assets/storage-pouch.svg', desc:'A soft pouch concept for clean, private storage between uses.', note:'Concept entry only. Actual fabric, dimensions and availability are not confirmed.', concept:true, material:'Fabric and care instructions to be confirmed.', fit:false}
  ];
  const productById = new Map(products.map(p => [p.id, p]));
  const moneyOrStatus = () => 'Price to be confirmed';
  let activeFilter = 'all';
  let searchText = '';
  let onlySaved = false;
  const saved = new Set(readArray('blacked-v10-saved').filter(id => productById.has(id)));
  const cart = new Map(Object.entries(readObject('blacked-v10-cart')).filter(([id, q]) => productById.has(id) && Number(q) > 0).map(([id,q]) => [id, Math.min(99, Math.floor(Number(q)))]));
  const compared = new Set();
  let selectedProduct = 'sculpt';
  let activeDialogProduct = null;
  let previewMode = 'reference';
  let userPhoto = null;
  let userPhotoUrl = null;
  let guideScale = 1;
  let guidePosition = {x:.5, y:.52};
  let dragging = false;
  let dragStart = null;
  let referenceImage = null;
  let referenceImageKey = '';
  let toastTimer;

  function readArray(key) { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch (_) { return []; } }
  function readObject(key) { try { const v = JSON.parse(localStorage.getItem(key) || '{}'); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch (_) { return {}; } }
  function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (_) { toast('This browser blocked saving. The feature will work until you close this page.'); return false; } }
  function toast(message) { const el = $('#toast'); if (!el) return; el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2800); }
  function categoryName(p) { return p.category === 'lingerie' ? 'Intimates' : p.category === 'toys' ? 'Personal wellness' : p.category === 'inspiration' ? 'External inspiration' : 'Care & accessories'; }
  function fallbackImage(p) { return p.fallback || (p.category === 'lingerie' ? 'assets/placeholder-lingerie.svg' : p.category === 'toys' ? 'assets/bullet-massager.svg' : 'assets/lube-care.svg'); }
  function imgMarkup(p, extra = '') { return `<img ${extra} src="${image(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(p)}'">`; }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  // Age gate. This is a respectful front-end confirmation, not identity verification.
  const ageGate = $('#ageGate');
  const underage = $('#underageScreen');
  try { if (localStorage.getItem('blacked-adult-confirmed') === 'yes') ageGate.hidden = true; } catch (_) {}
  $('#ageConfirm').addEventListener('click', () => { try { localStorage.setItem('blacked-adult-confirmed','yes'); } catch (_) {} ageGate.hidden = true; toast('Welcome to BLACKED.'); });
  $('#ageDecline').addEventListener('click', () => { ageGate.hidden = true; underage.hidden = false; });
  $('#returnAge').addEventListener('click', () => { underage.hidden = true; ageGate.hidden = false; });

  // Responsive navigation.
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mainNav.classList.toggle('open', open); });
  $$('a', mainNav).forEach(a => a.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation'); mainNav.classList.remove('open'); }));

  function productCard(p) {
    const isSaved = saved.has(p.id), isCompared = compared.has(p.id);
    const status = p.category === 'inspiration' ? 'REFERENCE' : p.concept ? 'CONCEPT' : 'CAMPAIGN';
    return `<article class="product-card" data-product-card="${p.id}">
      <button class="product-image" type="button" data-open-product="${p.id}" aria-label="View ${escapeHTML(p.name)} details">${imgMarkup(p)}<span class="product-status">${status}</span></button>
      <div class="product-body"><p class="product-category">${escapeHTML(p.label)}</p><h3>${escapeHTML(p.name)}</h3><p class="product-desc">${escapeHTML(p.desc)}</p><p class="product-price">${moneyOrStatus()}</p>
      <div class="product-actions"><button class="btn btn-dark" type="button" data-add-cart="${p.id}">Add to bag</button><button class="save-btn ${isSaved?'saved':''}" type="button" data-save="${p.id}" aria-label="${isSaved?'Unsave':'Save'} ${escapeHTML(p.name)}" aria-pressed="${isSaved}">${isSaved?'♥':'♡'}</button></div>
      <button class="compare-btn ${isCompared?'selected':''}" type="button" data-compare="${p.id}" aria-pressed="${isCompared}" style="width:100%;margin-top:7px;font-size:10px">${isCompared?'✓ Added to compare':'+ Compare'}</button></div></article>`;
  }
  function renderProducts() {
    const matched = products.filter(p => {
      const filterMatch = activeFilter === 'all' || (activeFilter === 'concept' ? p.concept : p.category === activeFilter);
      const query = searchText.trim().toLowerCase();
      const searchMatch = !query || [p.name,p.desc,p.label,p.category].join(' ').toLowerCase().includes(query);
      const savedMatch = !onlySaved || saved.has(p.id);
      return filterMatch && searchMatch && savedMatch;
    });
    $('#productGrid').innerHTML = matched.map(productCard).join('');
    $('#emptyState').hidden = matched.length > 0;
    $('#allCount').textContent = products.length;
    $('#wishlistCount').textContent = saved.size;
    $('#filterRow').querySelectorAll('[data-filter]').forEach(button => {
      const active = !onlySaved && button.dataset.filter === activeFilter;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    $('#wishlistJump').classList.toggle('saved-view', onlySaved);
    updateCompare(); updateCartUI();
  }
  $('#filterRow').addEventListener('click', e => { const btn = e.target.closest('[data-filter]'); if (!btn) return; activeFilter = btn.dataset.filter; onlySaved = false; renderProducts(); });
  $('#productSearch').addEventListener('input', e => { searchText = e.target.value; $('#clearSearch').hidden = !searchText; renderProducts(); });
  $('#clearSearch').addEventListener('click', () => { $('#productSearch').value = ''; searchText = ''; $('#clearSearch').hidden = true; renderProducts(); $('#productSearch').focus(); });
  $('#wishlistJump').addEventListener('click', () => { onlySaved = !onlySaved; activeFilter = 'all'; searchText = ''; $('#productSearch').value = ''; $('#clearSearch').hidden = true; renderProducts(); $('#collection').scrollIntoView({behavior:'smooth'}); toast(onlySaved ? 'Showing your saved items.' : 'Showing the full collection.'); });
  $('#wellnessShop').addEventListener('click', () => { activeFilter='toys'; onlySaved=false; renderProducts(); });

  function toggleSave(id) { if (!productById.has(id)) return; if (saved.has(id)) { saved.delete(id); toast('Removed from saved styles.'); } else { saved.add(id); toast('Saved on this device.'); } persist('blacked-v10-saved',[...saved]); renderProducts(); if (activeDialogProduct === id) syncDialogSave(); }
  function addToCart(id) { if (!productById.has(id)) return; cart.set(id, Math.min(99,(cart.get(id)||0)+1)); persist('blacked-v10-cart',Object.fromEntries(cart)); renderProducts(); toast(`${productById.get(id).name} added to your demo bag.`); openCart(); }
  function toggleCompare(id) { if (compared.has(id)) compared.delete(id); else { if (compared.size >= 3) { toast('Compare up to three items at a time.'); return; } compared.add(id); } renderProducts(); }
  $('#productGrid').addEventListener('click', e => {
    const add = e.target.closest('[data-add-cart]'); if (add) return addToCart(add.dataset.addCart);
    const save = e.target.closest('[data-save]'); if (save) return toggleSave(save.dataset.save);
    const compare = e.target.closest('[data-compare]'); if (compare) return toggleCompare(compare.dataset.compare);
    const detail = e.target.closest('[data-open-product]'); if (detail) openProductDialog(detail.dataset.openProduct);
  });

  function updateCompare() {
    const section = $('#compareSection'); const grid = $('#compareGrid');
    section.hidden = compared.size === 0;
    if (!compared.size) { grid.innerHTML=''; return; }
    grid.innerHTML = [...compared].map(id => { const p=productById.get(id); if (!p) return ''; return `<article class="compare-item">${imgMarkup(p)}<h4>${escapeHTML(p.name)}</h4><p>${escapeHTML(categoryName(p))} · ${p.concept?'Concept / availability unconfirmed':'Campaign reference'}</p><p>${moneyOrStatus()}</p><button class="btn btn-ghost btn-small" data-compare-remove="${id}">Remove</button></article>`; }).join('');
  }
  $('#compareGrid').addEventListener('click', e => { const b=e.target.closest('[data-compare-remove]'); if (b) { compared.delete(b.dataset.compareRemove); renderProducts(); } });
  $('#clearCompare').addEventListener('click', () => { compared.clear(); renderProducts(); });

  // Product details dialog.
  const productDialog = $('#productDialog');
  function openProductDialog(id) { const p=productById.get(id); if(!p) return; activeDialogProduct=id; const ext=$('#dialogExternal'); ext.hidden=!p.externalUrl; if(p.externalUrl){ext.href=p.externalUrl;} else {ext.removeAttribute('href');} $('#dialogImage').src=image(p.image); $('#dialogImage').alt=p.name; $('#dialogImage').onerror=()=>{ $('#dialogImage').onerror=null; $('#dialogImage').src=fallbackImage(p); }; $('#dialogCategory').textContent=p.label; $('#dialogTitle').textContent=p.name; $('#dialogDescription').textContent=p.desc+' '+p.note; $('#dialogPrice').textContent=moneyOrStatus(); $('#dialogMaterial').textContent=p.material; syncDialogSave(); if (typeof productDialog.showModal==='function') productDialog.showModal(); else productDialog.setAttribute('open',''); document.body.classList.add('modal-open'); }
  function syncDialogSave() { const b=$('#dialogSave'); const yes=saved.has(activeDialogProduct); b.textContent=yes?'♥ Saved on this device':'♡ Save style'; b.setAttribute('aria-pressed',String(yes)); }
  $('#closeProduct').addEventListener('click', closeProductDialog);
  productDialog.addEventListener('click', e => { if(e.target===productDialog) closeProductDialog(); });
  productDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  function closeProductDialog() { if(typeof productDialog.close==='function' && productDialog.open) productDialog.close(); else productDialog.removeAttribute('open'); document.body.classList.remove('modal-open'); }
  $('#dialogAdd').addEventListener('click', () => { const id=activeDialogProduct; closeProductDialog(); if(id) addToCart(id); });
  $('#dialogSave').addEventListener('click', () => { if(activeDialogProduct) toggleSave(activeDialogProduct); });

  // Local demo cart. No live order, stock or payment API is configured.
  function openCart() { $('#cartDrawer').hidden=false; $('#drawerBackdrop').hidden=false; document.body.classList.add('modal-open'); renderCart(); }
  function closeCart() { $('#cartDrawer').hidden=true; $('#drawerBackdrop').hidden=true; document.body.classList.remove('modal-open'); }
  $('#openCart').addEventListener('click',openCart); $('#closeCart').addEventListener('click',closeCart); $('#drawerBackdrop').addEventListener('click',closeCart);
  function updateCartUI() { const total=[...cart.values()].reduce((a,b)=>a+b,0); $('#cartCount').textContent=total; $('#drawerCount').textContent=total; }
  function renderCart() {
    const items=$('#cartItems'); const entries=[...cart.entries()].filter(([id,q])=>productById.has(id)&&q>0);
    if(!entries.length) { items.innerHTML='<div class="cart-empty"><div style="font-size:32px;color:#b46a85">♡</div><p>Your bag is empty.</p><p>Save a style or add a concept to explore the demo bag.</p></div>'; updateCartUI(); return; }
    items.innerHTML=entries.map(([id,q])=>{const p=productById.get(id); return `<article class="cart-item">${imgMarkup(p)}<div><h3>${escapeHTML(p.name)}</h3><p>${moneyOrStatus()}</p><div class="qty-controls"><button data-qty="-1" data-id="${id}" aria-label="Decrease quantity">−</button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove-cart="${id}">Remove</button></article>`;}).join(''); updateCartUI();
  }
  $('#cartItems').addEventListener('click',e=>{const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.id,next=(cart.get(id)||0)+Number(qty.dataset.qty);if(next<=0)cart.delete(id);else cart.set(id,Math.min(99,next));persist('blacked-v10-cart',Object.fromEntries(cart));renderCart();renderProducts();return;}const remove=e.target.closest('[data-remove-cart]');if(remove){cart.delete(remove.dataset.removeCart);persist('blacked-v10-cart',Object.fromEntries(cart));renderCart();renderProducts();}});
  $('#clearCart').addEventListener('click',()=>{cart.clear();persist('blacked-v10-cart',{});renderCart();renderProducts();toast('Demo bag cleared.');});
  $('#checkoutDemo').addEventListener('click',()=>toast('Online ordering is not connected. Add verified prices, inventory, business details and a secure checkout before accepting orders.'));

  // Style finder: deterministic suggestions only (no AI or fit/medical claims).
  $('#styleQuiz').addEventListener('submit', e => {
    e.preventDefault();
    const category = $('#quizCategory').value;
    const mood = $('#quizMood').value;
    let pool = products.filter(p => category === 'lace' ? ['redlace','blacklace','velvet','butterfly','midnight','scarlet','syrn-balconette','syrn-bodysuit'].includes(p.id) : p.category === category);
    if (category === 'lingerie' && mood === 'comfort') pool = pool.filter(p => ['signature','move','yoga','stretch','together'].includes(p.id));
    if (category === 'lingerie' && mood === 'lace') pool = pool.filter(p => ['redlace','blacklace','velvet','butterfly','midnight','scarlet','ivory'].includes(p.id));
    if (category === 'lingerie' && mood === 'bold') pool = pool.filter(p => ['redlace','blacklace','rose','scarlet','midnight'].includes(p.id));
    if (category === 'lingerie' && mood === 'simple') pool = pool.filter(p => ['signature','ivory','move','together'].includes(p.id));
    if (category === 'lace' && mood === 'simple') pool = pool.filter(p => ['velvet','ivory','butterfly','midnight'].includes(p.id));
    if (category === 'toys' && mood === 'simple') pool = pool.filter(p => ['pulse','lube'].includes(p.id));
    if (!pool.length) pool = products.filter(p => p.category === category);
    const picks = pool.slice(0,3);
    $('#quizResults').innerHTML = picks.length ? `<div class=\"quiz-results-grid\">${picks.map(p=>`<article class=\"quiz-result\">${imgMarkup(p)}<div><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.label)} · ${moneyOrStatus()}</small><button type=\"button\" class=\"btn btn-dark btn-small\" data-quiz-open=\"${p.id}\">View details</button></div></article>`).join('')}</div>` : '<p class=\"helper\">No suggestions for that combination yet. Try another preference.</p>';
    toast('Your style edit is ready.');
  });
  $('#quizResults').addEventListener('click', e => { const b=e.target.closest('[data-quiz-open]'); if(b) openProductDialog(b.dataset.quizOpen); });

  // Measurement estimator uses a sample chart; it is not a bra band/cup calculator.
  const sampleRanges = [
    {size:'XS', bust:[71,76], waist:[56,61], hips:[76,81]}, {size:'S', bust:[76,81], waist:[61,66], hips:[81,86]},
    {size:'M', bust:[81,86], waist:[66,71], hips:[86,91]}, {size:'L', bust:[86,91], waist:[71,76], hips:[91,97]},
    {size:'XL', bust:[91,97], waist:[76,81], hips:[97,102]}, {size:'XXL', bust:[97,102], waist:[81,86], hips:[102,107]}
  ];
  const sampleSize = (value,key) => { if(value < sampleRanges[0][key][0]) return 'Below XS'; if(value > sampleRanges[sampleRanges.length-1][key][1]) return 'Above XXL'; const found=sampleRanges.find((r,i)=>value>=r[key][0]&&(value<r[key][1]||(i===sampleRanges.length-1&&value<=r[key][1]))); return found?.size || 'Check chart'; };
  $('#sizeForm').addEventListener('submit', e => { e.preventDefault(); const vals={bust:Number($('#measureBust').value),waist:Number($('#measureWaist').value),hips:Number($('#measureHips').value)}; if(Object.values(vals).some(v=>!Number.isFinite(v)||v<=0)){ $('#sizeResult').textContent='Please enter all three measurements as positive centimetre values.'; return; } const bustSize=sampleSize(vals.bust,'bust'),waistSize=sampleSize(vals.waist,'waist'),hipSize=sampleSize(vals.hips,'hips'); $('#sizeResult').textContent=`Sample estimate only — top / bust: ${bustSize}; waist: ${waistSize}; hips / bottom: ${hipSize}. This is not verified BLACKED sizing or bra cup-size guidance.`; });

  // Fit Studio: actual product reference view or generic manual overlay on a local photo.
  const canvas=$('#tryCanvas');const ctx=canvas.getContext('2d');
  const canvasW=canvas.width,canvasH=canvas.height;
  function getSelected(){return productById.get(selectedProduct)||productById.get('sculpt');}
  function loadReference(p) { const src=image(p.image); if(referenceImageKey===src && referenceImage && referenceImage.complete) {drawCanvas();return;} referenceImageKey=src;referenceImage=null;const im=new Image();if(src.startsWith(ASSET_BASE)) im.crossOrigin='anonymous';im.onload=()=>{if(referenceImageKey===src){referenceImage=im;drawCanvas();}};im.onerror=()=>{referenceImage=null;drawCanvas();};im.src=src; }
  function drawCanvas() {
    ctx.clearRect(0,0,canvasW,canvasH);ctx.fillStyle='#ede0dc';ctx.fillRect(0,0,canvasW,canvasH);
    if(previewMode==='manual'&&userPhoto) {
      const ratio=Math.min(canvasW/userPhoto.naturalWidth,canvasH/userPhoto.naturalHeight);const w=userPhoto.naturalWidth*ratio,h=userPhoto.naturalHeight*ratio;ctx.drawImage(userPhoto,(canvasW-w)/2,(canvasH-h)/2,w,h);
      const sc=guideScale;const cx=guidePosition.x*canvasW,cy=guidePosition.y*canvasH;ctx.save();ctx.translate(cx,cy);ctx.scale(sc,sc);ctx.fillStyle='rgba(38,27,34,.83)';ctx.strokeStyle='rgba(255,235,241,.88)';ctx.lineWidth=3;
      // Illustrative top layer — generic shape only, never represented as a cut-out from the selected product.
      ctx.beginPath();ctx.moveTo(-100,-30);ctx.bezierCurveTo(-118,-100,-55,-128,-28,-77);ctx.lineTo(0,-24);ctx.lineTo(28,-77);ctx.bezierCurveTo(55,-128,118,-100,100,-30);ctx.lineTo(75,34);ctx.quadraticCurveTo(0,60,-75,34);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-72,-60);ctx.quadraticCurveTo(-58,-150,-30,-123);ctx.moveTo(72,-60);ctx.quadraticCurveTo(58,-150,30,-123);ctx.stroke();
      ctx.fillStyle='rgba(38,27,34,.82)';ctx.beginPath();ctx.moveTo(-88,105);ctx.quadraticCurveTo(-45,125,0,112);ctx.quadraticCurveTo(45,125,88,105);ctx.lineTo(60,165);ctx.lineTo(28,207);ctx.quadraticCurveTo(0,190,-28,207);ctx.lineTo(-60,165);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
      ctx.fillStyle='rgba(255,250,247,.88)';ctx.fillRect(0,canvasH-48,canvasW,48);ctx.fillStyle='#4e3742';ctx.font='600 12px Arial';ctx.textAlign='center';ctx.fillText('MANUAL GUIDE · NOT A FIT SIMULATION',canvasW/2,canvasH-19);return;
    }
    const p=getSelected(); if(!referenceImage || !referenceImage.naturalWidth){ctx.fillStyle='#4e3742';ctx.textAlign='center';ctx.font='600 22px Arial';ctx.fillText('BLACKED',canvasW/2,canvasH/2-8);ctx.font='13px Arial';ctx.fillText(p.name,canvasW/2,canvasH/2+20);}else{const r=Math.min((canvasW-28)/referenceImage.naturalWidth,(canvasH-94)/referenceImage.naturalHeight);const w=referenceImage.naturalWidth*r,h=referenceImage.naturalHeight*r;ctx.drawImage(referenceImage,(canvasW-w)/2,(canvasH-60-h)/2,w,h);}
    ctx.fillStyle='rgba(34,24,29,.88)';ctx.fillRect(0,canvasH-60,canvasW,60);ctx.fillStyle='#fff6f4';ctx.textAlign='center';ctx.font='700 18px Arial';ctx.fillText(p.name.length>34?p.name.slice(0,31)+'…':p.name,canvasW/2,canvasH-35);ctx.font='10px Arial';ctx.fillStyle='#e2cbd3';ctx.fillText(p.concept?'CONCEPT PREVIEW · STOCK NOT CONFIRMED':'CAMPAIGN REFERENCE',canvasW/2,canvasH-16);
  }
  const studioSelect = $('#studioProduct');
  const studioProducts = products.filter(p => p.fit);
  studioSelect.innerHTML = studioProducts.map(p => `<option value=\"${p.id}\">${escapeHTML(p.name)}</option>`).join('');
  studioSelect.value = studioProducts.some(p => p.id === selectedProduct) ? selectedProduct : studioProducts[0]?.id || 'signature';
  selectedProduct = studioSelect.value;
  $('#studioTitle').textContent = getSelected().name;
  $('#studioProduct').addEventListener('change',e=>{selectedProduct=e.target.value;const p=getSelected();$('#studioTitle').textContent=p.name;referenceImage=null;referenceImageKey='';loadReference(p);$('#studioStatus').textContent=`${p.name} selected. This reference view is not an automatic fitting simulation.`;});
  function setPreviewMode(mode){if(mode==='manual'&&!userPhoto){toast('Upload your own photo first.');return;}previewMode=mode;$('#referenceMode').classList.toggle('active',mode==='reference');$('#manualMode').classList.toggle('active',mode==='manual');$('#referenceMode').setAttribute('aria-pressed',String(mode==='reference'));$('#manualMode').setAttribute('aria-pressed',String(mode==='manual'));$('#manualMode').disabled=!userPhoto;$('#canvasTag').textContent=mode==='reference'?'SELECTED REFERENCE':'YOUR PHOTO · MANUAL GUIDE';drawCanvas();}
  $('#referenceMode').addEventListener('click',()=>setPreviewMode('reference'));$('#manualMode').addEventListener('click',()=>setPreviewMode('manual'));
  $('#photoUpload').addEventListener('change',e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const allowed=['image/jpeg','image/png','image/webp'];if(!allowed.includes(file.type)){toast('Choose a JPG, PNG or WEBP image.');e.target.value='';return;}if(file.size>12*1024*1024){toast('Image is over 12 MB. Choose a smaller file.');e.target.value='';return;}const url=URL.createObjectURL(file);const im=new Image();im.onload=()=>{if(userPhotoUrl)URL.revokeObjectURL(userPhotoUrl);userPhoto=im;userPhotoUrl=url;$('#manualMode').disabled=false;setPreviewMode('manual');$('#studioStatus').textContent='Your photo is displayed locally. Drag the guide to adjust its position; this is not an exact garment try-on.';e.target.value='';};im.onerror=()=>{URL.revokeObjectURL(url);e.target.value='';toast('Could not open that image. Try another file.');};im.src=url;});
  $('#clearPhoto').addEventListener('click',()=>{if(userPhotoUrl)URL.revokeObjectURL(userPhotoUrl);userPhoto=null;userPhotoUrl=null;$('#photoUpload').value='';$('#manualMode').disabled=true;setPreviewMode('reference');$('#studioStatus').textContent='Personal photo cleared from the preview.';});
  $('#guideScale').addEventListener('input',e=>{guideScale=Number(e.target.value)/100;$('#guideScaleOut').value=`${e.target.value}%`;if(previewMode==='manual')drawCanvas();});
  function canvasCoords(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*canvasW/r.width,y:(e.clientY-r.top)*canvasH/r.height};}
  canvas.addEventListener('pointerdown',e=>{if(previewMode!=='manual'||!userPhoto)return;dragging=true;const p=canvasCoords(e);dragStart={pointer:p,base:{...guidePosition}};canvas.setPointerCapture?.(e.pointerId);e.preventDefault();});
  canvas.addEventListener('pointermove',e=>{if(!dragging||!dragStart)return;const p=canvasCoords(e);guidePosition.x=Math.max(.18,Math.min(.82,dragStart.base.x+(p.x-dragStart.pointer.x)/canvasW));guidePosition.y=Math.max(.23,Math.min(.77,dragStart.base.y+(p.y-dragStart.pointer.y)/canvasH));drawCanvas();});
  const stopDrag=()=>{dragging=false;dragStart=null;};canvas.addEventListener('pointerup',stopDrag);canvas.addEventListener('pointercancel',stopDrag);
  $('#downloadPreview').addEventListener('click',()=>{try{drawCanvas();canvas.toBlob(blob=>{if(!blob){toast('Could not export the preview. Try reloading the product image.');return;}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='blacked-fit-studio-preview.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Preview saved to your device.');},'image/png');}catch(_){toast('Image export failed. When testing locally, use the GitHub Pages website so image-origin restrictions do not block the export.');}});

  // Quick share helper for current saved list, used as a useful zero-backend feature.
  $('#wishlistJump').title='Show or hide saved styles';
  const shareLabel=document.createElement('button');shareLabel.type='button';shareLabel.className='btn btn-ghost btn-small';shareLabel.textContent='Share saved list';shareLabel.style.marginTop='12px';shareLabel.addEventListener('click',async()=>{const list=[...saved].map(id=>productById.get(id)?.name).filter(Boolean);if(!list.length){toast('Save a few styles first.');return;}const text='My BLACKED style shortlist: '+list.join(', ')+'. Product prices and availability are not confirmed.';try{if(navigator.share)await navigator.share({title:'My BLACKED shortlist',text});else if(navigator.clipboard){await navigator.clipboard.writeText(text);toast('Shortlist copied to clipboard.');}else toast(text);}catch(_){}});
  const savedPanel=document.createElement('div');savedPanel.className='saved-share';savedPanel.appendChild(shareLabel);$('#collection').appendChild(savedPanel);

  $('#year').textContent=String(new Date().getFullYear());
  renderProducts();renderCart();loadReference(getSelected());drawCanvas();
})();
