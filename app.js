(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const C = window.BLK;
  if (!C) { document.body.insertAdjacentHTML('afterbegin', '<p role="alert">Content registry failed to load. Ensure catalog.js is uploaded beside index.html.</p>'); return; }

  const STORAGE = {
    wishlist: 'blacked-fit-studio-wishlist-v03',
    legacyWishlist: 'blacked31Wishlist',
    bag: 'blacked31Bag',
    fitNote: 'blacked31FitNote',
    passport: 'blacked-fit-passport-v040',
    drafts: 'blacked-brand-studio-drafts-v1'
  };
  const safeRead = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } };
  const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const safeRemove = key => { try { localStorage.removeItem(key); return true; } catch { return false; } };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function setImageSource(img, src, alt) {
    if (!img) return;
    img.hidden = false;
    if (alt !== undefined) img.alt = alt;
    const frame = img.closest('.media-frame, .product-media, .gallery-open, .detail-image');
    const fallback = frame?.querySelector('.media-fallback');
    if (fallback) fallback.hidden = true;
    frame?.classList.remove('asset-unavailable');
    img.src = src;
  }
  const allProducts = C.products;
  const productById = new Map(allProducts.map(product => [product.id, product]));
  const state = {
    view: 'home',
    activeProductId: 'signature',
    detailProductId: null,
    wishlist: new Set([
      ...(Array.isArray(safeRead(STORAGE.wishlist, [])) ? safeRead(STORAGE.wishlist, []) : []),
      ...(Array.isArray(safeRead(STORAGE.legacyWishlist, [])) ? safeRead(STORAGE.legacyWishlist, []) : [])
    ].filter(value => typeof value === 'string')),
    compare: [],
    bag: Array.isArray(safeRead(STORAGE.bag, [])) ? safeRead(STORAGE.bag, []).filter(item => item && typeof item === 'object') : [],
    photoUrl: null,
    fitNote: (() => { const value = safeRead('blacked31FitNote', null); return value && typeof value === 'object' && !Array.isArray(value) ? { label: typeof value.label === 'string' ? value.label.slice(0,100) : '', notes: typeof value.notes === 'string' ? value.notes.slice(0,2000) : '' } : null; })(),
    lastDirtyPrompt: null,
    dirtyCategory: 'flirting',
    dirtyRotation: 0,
    wheelRotations: { dildo: 0, plug: 0, boyfriend: 0 },
    measureUnit: 'cm',
    lightboxItems: [],
    lightboxIndex: 0
  };

  const nav = $('#primaryNav');
  const menuToggle = $('#menuToggle');
  const navButtons = $$('[data-view]');
  const views = $$('[data-page]');
  const toastEl = $('#toast');
  let toastTimer = 0;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2600);
  }

  function activateView(name, options = {}) {
    const target = views.find(view => view.dataset.page === name);
    if (!target) return false;
    state.view = name;
    views.forEach(view => {
      const active = view === target;
      view.hidden = !active;
      view.classList.toggle('active', active);
      view.setAttribute('aria-hidden', String(!active));
    });
    navButtons.forEach(button => {
      const active = button.dataset.view === name;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (options.updateHash !== false && history.replaceState && location.protocol !== 'about:') {
      history.replaceState(null, '', `#${name}`);
    }
    if (options.scroll !== false) window.scrollTo({ top: 0, behavior: options.behavior || 'auto' });
    return true;
  }
  navButtons.forEach(button => button.addEventListener('click', () => activateView(button.dataset.view)));
  $$('[data-go]').forEach(button => button.addEventListener('click', () => {
    activateView(button.dataset.go);
    const category = button.dataset.dirtyCategory;
    if (category && C.dirtyCategories[category]) selectDirtyCategory(category);
  }));
  $$('[data-home-link]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); activateView('home'); }));
  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  window.addEventListener('hashchange', () => {
    const requested = decodeURIComponent(location.hash.slice(1));
    activateView(requested || 'home', { updateHash: false, scroll: false });
  });
  const initialView = decodeURIComponent(location.hash.slice(1));
  activateView(views.some(view => view.dataset.page === initialView) ? initialView : 'home', { updateHash: false, scroll: false });

  // Any image failure becomes a neutral labelled placeholder; never swap in an unrelated asset.
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    img.hidden = true;
    if (img.id === 'fitOverlayImage') { $('#overlayAvailability').textContent='Mapped overlay image unavailable. Reference/local photo remains available; no substitute overlay is used.'; return; }
    if (img.id === 'fitUserPhoto') { $('#fitStageStatus').textContent='Local photo preview could not be rendered; choose another file.'; return; }
    const frame = img.closest('.media-frame, .product-media, .gallery-open, .detail-image');
    const fallback = frame?.querySelector('.media-fallback');
    if (fallback) fallback.hidden = false;
    frame?.classList.add('asset-unavailable');
  }, true);
  document.addEventListener('load', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.complete && img.naturalWidth > 0) {
      const frame = img.closest('.media-frame, .product-media, .gallery-open, .detail-image');
      const fallback = frame?.querySelector('.media-fallback');
      if (fallback) fallback.hidden = true;
      frame?.classList.remove('asset-unavailable');
    }
  }, true);

  function persistWishlist() {
    const items = [...state.wishlist];
    const a = safeWrite(STORAGE.wishlist, items);
    // Keep the previous Fusion 3.1 key compatible on the same GitHub Pages origin.
    const b = safeWrite(STORAGE.legacyWishlist, items);
    if (!a && !b) toast('Browser storage is blocked; saved style works only for this session.');
  }
  function renderProductCard(product, savedView = false) {
    const saved = state.wishlist.has(product.id);
    return `<article class="product-card" data-product-id="${escapeHtml(product.id)}">
      <button class="product-media media-frame" type="button" data-details="${escapeHtml(product.id)}" aria-label="Open details for ${escapeHtml(product.name)}">
        <img loading="lazy" decoding="async" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} — ${escapeHtml(product.tag)}" crossorigin="anonymous">
        <span class="media-fallback" hidden>Original image unavailable. Check the asset source or try again later.</span>
        <span class="media-badge">${escapeHtml(product.tag)}</span>
        <span class="save-button" role="button" aria-label="${saved ? 'Remove saved style' : 'Save style'} ${escapeHtml(product.name)}" aria-pressed="${saved}" data-save="${escapeHtml(product.id)}">${saved ? '♥' : '♡'}</span>
      </button>
      <div class="product-copy"><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p><div class="product-actions">
        <button class="small-button" type="button" data-details="${escapeHtml(product.id)}">Details</button>
        <button class="small-button" type="button" data-compare="${escapeHtml(product.id)}" aria-pressed="${state.compare.includes(product.id)}">${state.compare.includes(product.id) ? 'Compared ✓' : 'Compare'}</button>
        ${savedView ? `<button class="small-button" type="button" data-remove-save="${escapeHtml(product.id)}">Remove</button>` : ''}
      </div></div></article>`;
  }
  function renderCatalog() {
    const search = ($('#catalogSearch')?.value || '').trim().toLocaleLowerCase();
    const category = $('#catalogCategory')?.value || 'all';
    const sort = $('#catalogSort')?.value || 'featured';
    let items = allProducts.filter(product => {
      const content = `${product.name} ${product.description} ${product.category} ${product.tag}`.toLocaleLowerCase();
      return (!search || content.includes(search)) && (category === 'all' || product.category === category);
    });
    if (sort === 'name-asc') items.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') items.sort((a,b) => b.name.localeCompare(a.name));
    $('#catalogCount').textContent = `${items.length} references`;
    $('#catalogGrid').innerHTML = items.map(product => renderProductCard(product)).join('');
    $('#catalogEmpty').hidden = items.length > 0;
    renderWishlist();
    renderCompare();
  }
  function renderWishlist() {
    const known = [...state.wishlist].map(id => productById.get(id)).filter(Boolean);
    $('#wishlistCount').textContent = `${state.wishlist.size} saved`;
    $('#wishlistGrid').innerHTML = known.length ? known.map(product => renderProductCard(product, true)).join('') : '<p class="empty-state">No mapped saved styles to display yet. Existing unknown saved IDs remain retained in browser storage.</p>';
  }
  function toggleWishlist(id) {
    if (!productById.has(id)) return;
    if (state.wishlist.has(id)) { state.wishlist.delete(id); toast('Removed from saved styles.'); }
    else { state.wishlist.add(id); toast('Saved on this device.'); }
    persistWishlist(); renderCatalog(); updateDialogButtons();
  }
  function renderCompare() {
    const known = state.compare.map(id => productById.get(id)).filter(Boolean);
    const grid = $('#compareGrid');
    if (!known.length) { grid.innerHTML = '<p class="empty-state">Add references using “Compare”.</p>'; return; }
    grid.innerHTML = known.map(product => `<article class="compare-item"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" crossorigin="anonymous"><h3>${escapeHtml(product.name)}</h3><p><strong>Category:</strong> ${escapeHtml(product.category)}</p><p><strong>Type:</strong> ${escapeHtml(product.type)}</p><p>Price, sizes, material, stock: <strong>Not confirmed</strong></p><button class="small-button" type="button" data-remove-compare="${escapeHtml(product.id)}">Remove</button></article>`).join('');
  }
  function toggleCompare(id) {
    if (!productById.has(id)) return;
    if (state.compare.includes(id)) state.compare = state.compare.filter(item => item !== id);
    else if (state.compare.length >= 3) { toast('Compare up to three references at a time.'); return; }
    else state.compare.push(id);
    renderCatalog(); renderCompare(); updateDialogButtons();
    toast(state.compare.includes(id) ? 'Added to comparison.' : 'Removed from comparison.');
  }
  const productDialog = $('#productDialog');
  function openProduct(id) {
    const product = productById.get(id);
    if (!product) return;
    state.detailProductId = id;
    $('#productDialogTitle').textContent = product.name;
    setImageSource($('#productDialogImage'), product.image, `${product.name} — reference preview`);
    $('#productDialogType').textContent = product.tag;
    $('#productDialogDescription').textContent = product.description;
    $('#productDialogDetails').textContent = product.details;
    updateDialogButtons();
    openDialog(productDialog);
  }
  function updateDialogButtons() {
    const product = productById.get(state.detailProductId);
    if (!product) return;
    $('#saveProductFromDialog').textContent = state.wishlist.has(product.id) ? 'Remove saved style' : 'Save style';
    $('#compareProductFromDialog').textContent = state.compare.includes(product.id) ? 'Remove from compare' : 'Compare';
  }
  function openDialog(dialog) {
    if (!dialog) return;
    try { if (!dialog.open) dialog.showModal(); }
    catch { dialog.setAttribute('open',''); }
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    try { if (dialog.open) dialog.close(); else dialog.removeAttribute('open'); }
    catch { dialog.removeAttribute('open'); }
  }
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => closeDialog($('#'+button.dataset.closeDialog))));
  [productDialog, $('#lightboxDialog')].forEach(dialog => dialog?.addEventListener('click', event => { if (event.target === dialog) closeDialog(dialog); }));

  function renderBag() {
    const count = state.bag.reduce((sum, item) => sum + Math.max(1, Number(item.qty) || 1), 0);
    $('#bagCount').textContent = `${count} item${count === 1 ? '' : 's'}`;
    if (!state.bag.length) { $('#bagPanel').innerHTML = '<p class="empty-state">Your demo bag is empty.</p>'; return; }
    $('#bagPanel').innerHTML = `<div class="issue-list">${state.bag.map((item,index) => {
      const id = String(item.id || 'legacy-item'); const name = String(item.name || productById.get(id)?.name || 'Saved demo item');
      const p = Number(item.price); const qty = Math.max(1, Math.min(99, parseInt(item.qty,10) || 1));
      return `<div class="issue-item"><div><h3>${escapeHtml(name)}</h3><p>Demo item · no real order. ${Number.isFinite(p) && p > 0 ? 'Sample value ₹'+p.toFixed(0) : 'Price not configured.'}</p><div class="button-row"><button class="small-button" type="button" data-bag-step="${index}" data-step="-1">−</button><span class="chip">Qty ${qty}</span><button class="small-button" type="button" data-bag-step="${index}" data-step="1">+</button><button class="small-button" type="button" data-bag-remove="${index}">Remove</button></div></div></div>`;
    }).join('')}</div><p class="micro-note">Sample data only. No purchase or checkout is available.</p>`;
  }
  function addDemoBag(id) {
    const product = productById.get(id);
    if (!product) return;
    const existing = state.bag.find(item => item.id === id);
    if (existing) existing.qty = Math.min(99,(Number(existing.qty)||1)+1);
    else state.bag.push({id, name:product.name, price:0, image:product.image, qty:1, source:'V1 demo'});
    safeWrite(STORAGE.bag, state.bag); renderBag(); toast('Added to demo bag only—not a real order.');
  }

  // Style Finder only filters fields explicitly present in the content registry.
  function claimStatus(product) {
    if (product.type === 'external-reference') return 'external';
    if (product.type === 'concept') return 'concept';
    return 'reference';
  }
  function renderStyleFinder() {
    const category = $('#styleOccasion').value;
    const type = $('#styleMood').value;
    const claim = $('#styleColour').value;
    const matches = allProducts.filter(product =>
      (category === 'all' || product.category === category) &&
      (type === 'all' || product.type === type) &&
      (claim === 'all' || claimStatus(product) === claim)
    );
    $('#styleFinderResults').innerHTML = matches.slice(0,8).map(product => renderProductCard(product)).join('');
    $('#styleFinderEmpty').hidden = matches.length > 0;
    $('#styleFinderStatus').textContent = `${matches.length} reference(s) match the selected, recorded catalogue fields. Unknown colour, fabric and fit attributes are not inferred.`;
  }
  $('#runStyleFinder').addEventListener('click', renderStyleFinder);
  $('#resetStyleFinder').addEventListener('click', () => {
    $('#styleOccasion').value='all'; $('#styleMood').value='all'; $('#styleColour').value='all'; renderStyleFinder();
  });
  ['styleOccasion','styleMood','styleColour'].forEach(id => $('#'+id).addEventListener('change', renderStyleFinder));

  // Build-a-set / Style Board: the board is a visual concept, not a claim of compatibility or availability.
  function fillStyleBoardSelects() {
    const options = allProducts.map(product => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)} · ${escapeHtml(product.tag)}</option>`).join('');
    $('#boardPrimary').innerHTML = options; $('#boardAccent').innerHTML = options;
    $('#boardPrimary').value = 'signature'; $('#boardAccent').value = 'midnight';
    renderStyleBoard();
  }
  function renderStyleBoard() {
    const primary = productById.get($('#boardPrimary').value) || allProducts[0];
    const accent = productById.get($('#boardAccent').value) || allProducts[1];
    setImageSource($('#boardPrimaryImage'),primary.image,`${primary.name} reference`);
    setImageSource($('#boardAccentImage'),accent.image,`${accent.name} reference`);
    $('#boardPrimaryName').textContent = primary.name; $('#boardAccentName').textContent = accent.name;
    $('#styleBoardStatus').textContent = `Board contains ${primary.name} + ${accent.name}. Both are references/concepts; fit, matching, stock and price are not confirmed.`;
  }
  $('#buildStyleBoard').addEventListener('click', () => { renderStyleBoard(); toast('Style board refreshed.'); });
  $('#boardPrimary').addEventListener('change', renderStyleBoard); $('#boardAccent').addEventListener('change', renderStyleBoard);
  $('#exportStyleBoardJson').addEventListener('click', () => {
    const primary=productById.get($('#boardPrimary').value), accent=productById.get($('#boardAccent').value);
    downloadBlob('blacked-style-board.json',JSON.stringify({schemaVersion:1,type:'reference-board',createdAt:new Date().toISOString(),items:[primary,accent].filter(Boolean).map(p=>({id:p.id,name:p.name,category:p.category,type:p.type,image:p.image,details:p.details})),disclaimer:'Concept board only. Not verified product compatibility, inventory or price.'},null,2));
  });
  $('#downloadStyleBoard').addEventListener('click', async () => {
    const primary=productById.get($('#boardPrimary').value), accent=productById.get($('#boardAccent').value);
    if(!primary||!accent) { $('#styleBoardStatus').textContent='Choose two references first.'; return; }
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=780;const ctx=canvas.getContext('2d');
    if(!ctx){$('#styleBoardStatus').textContent='PNG export is not available in this browser.';return;}
    ctx.fillStyle='#100b10';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ffb5d2';ctx.font='bold 18px system-ui';ctx.fillText('BLACKED · STYLE BOARD',50,52);
    ctx.fillStyle='#e8cc91';ctx.font='bold 12px system-ui';ctx.fillText('REFERENCE ONLY · NOT CONFIRMED STOCK',50,78);
    const loadImage = src => new Promise((resolve,reject)=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('image failed'));img.src=src;});
    try {
      const images=await Promise.all([loadImage(primary.image),loadImage(accent.image)]);
      const drawContain=(img,x,y,w,h)=>{const ratio=Math.min(w/img.naturalWidth,h/img.naturalHeight);const iw=img.naturalWidth*ratio,ih=img.naturalHeight*ratio;ctx.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih);};
      drawContain(images[0],45,105,535,555);drawContain(images[1],620,105,535,555);
      ctx.fillStyle='#fff7fb';ctx.font='bold 19px system-ui';ctx.fillText(primary.name,50,700);ctx.fillText(accent.name,625,700);
      ctx.fillStyle='#c5b5c1';ctx.font='13px system-ui';ctx.fillText('Concept board. Verify real product details, compatibility and image rights.',50,738);
      const link=document.createElement('a');link.href=canvas.toDataURL('image/png');link.download='blacked-style-board.png';link.click();
      $('#styleBoardStatus').textContent='PNG board downloaded. It contains reference imagery only, not a product or fit claim.';
    } catch {
      $('#styleBoardStatus').textContent='PNG export could not draw a remote source image (network/CORS restriction). Export the board JSON now; Step 3 will package verified originals locally and retest PNG export.';
    }
  });

  // Secret Fantasy Corner creates only an on-screen prompt; prompts/preferences are not stored or transmitted.
  const fantasyPrompts = {
    mystery: {
      gentle:['Imagine a mysterious first meeting in a quiet, rain-soaked café. What would make the conversation feel comfortable?','Create a fictional slow-burn romance scene with a clear, respectful invitation.'],
      playful:['Invent a dramatic secret-admirer note that makes both fictional adults laugh.','Describe a mysterious date setting using three details and no pressure.'],
      bold:['Write a confident, cinematic line for two fictional adults who both welcome the flirtation.','Discuss which kinds of mystery feel exciting and which feel uncomfortable.']
    },
    flirty: {
      gentle:['Share a compliment that feels sincere and easy to receive.','Ask your partner what kind of flirting feels fun rather than awkward.'],
      playful:['Invent a cheeky double-meaning one-liner that is funny, not insulting.','Create a private nickname you both like; either person can veto it.'],
      bold:['Try a confident but respectful line, then let the other person choose the next move.','Describe a bold date invitation that leaves an easy way to say no.']
    },
    romantic: {
      gentle:['Describe a small gesture that makes you feel remembered.','Plan a quiet evening with a favourite song and an honest conversation.'],
      playful:['Make a romantic movie scene out of an ordinary walk together.','Trade one sincere compliment and one silly prediction about your next date.'],
      bold:['Describe a romantic setting with tension and anticipation, without assuming anyone owes a response.','Ask what helps each of you feel wanted and respected.']
    },
    roleplay: {
      gentle:['Pick a fictional setting and agree on roles, boundaries and a simple way to pause.','Plan a fictional meet-cute scene where both adults can change the story at any time.'],
      playful:['Play two fictional strangers meeting at a bookshop; stop whenever either wants.','Write two lines of dialogue for a playful, mutually welcomed fictional encounter.'],
      bold:['Design a bold fictional roleplay opener only after agreeing on the scenario and limits.','Talk through what is on-limits, off-limits and “maybe another time” before starting a scenario.']
    },
    boundaries: {
      gentle:['Ask: “Would you enjoy talking about this, or shall we choose something else?”','Each person names one thing that helps them feel safe enough to be honest.'],
      playful:['Make a green/yellow/red list of topics you both like, might discuss later, or want to skip.','Create a friendly pause phrase that means “let’s slow down” without explaining why.'],
      bold:['Discuss one curiosity and one clear boundary, then thank each other for being honest.','Agree that either person can change their mind at any time, without guilt or pressure.']
    }
  };
  let currentFantasyPrompt='';
  $('#generateFantasy').addEventListener('click',()=>{
    if(!$('#fantasyConsent').checked){$('#fantasyStatus').textContent='Please acknowledge the adult/consent note first.';toast('Confirm the consent note first.');return;}
    const mood=$('#fantasyMood').value,boldness=$('#fantasyBoldness').value;const pool=fantasyPrompts[mood]?.[boldness]||fantasyPrompts.romantic.gentle;
    currentFantasyPrompt=pool[Math.floor(Math.random()*pool.length)];$('#fantasyResult').textContent=currentFantasyPrompt;$('#fantasyStatus').textContent='Generated locally; not saved to storage and not sent to a server.';
  });
  $('#copyFantasy').addEventListener('click',()=>copyText(currentFantasyPrompt,$('#fantasyStatus')));

  // Fit Studio: current selected product and its matching overlay stay tied to one product ID.
  function setStudioProduct(id) {
    const product = productById.get(id) || productById.get('signature');
    state.activeProductId = product.id;
    $('#fitProductLabel').textContent = product.name;
    setImageSource($('#fitReferenceImage'), product.image, `${product.name} reference preview`);
    $('#fitOverlayImage').hidden = true;
    $('#fitOverlayImage').removeAttribute('src');
    $('#fitOverlayImage').style.width = `${$('#overlayScale').value}%`;
    $('#fitOverlayImage').style.opacity = String(Number($('#overlayOpacity').value)/100);
    $('#fitOverlayImage').style.left = `${$('#overlayX').value}%`;
    $('#fitOverlayImage').style.top = `${$('#overlayY').value}%`;
    $('#overlayAvailability').textContent = product.overlay ? 'A product-specific concept overlay is mapped. It is illustrative, not a reliable fit/size prediction.' : 'No product-specific overlay is mapped for this reference. Reference preview only; no substitute overlay is used.';
    if (state.photoUrl) drawPhotoPreview();
    else { $('#fitReferenceImage').hidden = false; $('#fitUserPhoto').hidden = true; $('#fitStageStatus').textContent = 'Reference preview. No personal photo selected.'; }
  }
  function drawPhotoPreview() {
    const product = productById.get(state.activeProductId);
    setImageSource($('#fitUserPhoto'), state.photoUrl, 'Your selected local photo preview');
    $('#fitUserPhoto').hidden = false;
    $('#fitReferenceImage').hidden = true;
    if (product?.overlay) {
      $('#fitOverlayImage').src = product.overlay;
      $('#fitOverlayImage').hidden = false;
      $('#fitOverlayImage').style.width = `${$('#overlayScale').value}%`;
      $('#fitOverlayImage').style.opacity = String(Number($('#overlayOpacity').value)/100);
      $('#fitOverlayImage').style.left = `${$('#overlayX').value}%`;
      $('#fitOverlayImage').style.top = `${$('#overlayY').value}%`;
      $('#fitStageStatus').textContent = 'Local photo + mapped illustrative overlay. This does not simulate physical fit.';
    } else {
      $('#fitOverlayImage').hidden = true;
      $('#fitStageStatus').textContent = 'Local photo preview only; no product-specific overlay is available for this reference.';
    }
  }
  $('#fitPhotoUpload').addEventListener('change', event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast('Please choose an image file.'); event.target.value=''; return; }
    if (file.size > 15 * 1024 * 1024) { toast('Choose an image under 15 MB.'); event.target.value=''; return; }
    if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
    state.photoUrl = URL.createObjectURL(file);
    drawPhotoPreview();
    toast('Photo preview loaded locally in this browser.');
  });
  $('#clearFitPhoto').addEventListener('click', () => {
    if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
    state.photoUrl = null; $('#fitPhotoUpload').value=''; $('#fitUserPhoto').removeAttribute('src'); $('#fitUserPhoto').hidden = true; $('#fitOverlayImage').hidden = true; $('#fitReferenceImage').hidden = false;
    $('#fitStageStatus').textContent = 'Photo cleared from the visible preview. No upload was performed.';
    toast('Photo cleared from preview.');
  });
  function updateOverlayControls() {
    const scale = $('#overlayScale').value, opacity = $('#overlayOpacity').value, x = $('#overlayX').value, y = $('#overlayY').value;
    $('#overlayScaleValue').textContent = `${scale}%`; $('#overlayOpacityValue').textContent = `${opacity}%`; $('#overlayXValue').textContent = `${x}%`; $('#overlayYValue').textContent = `${y}%`;
    $('#fitOverlayImage').style.width = `${scale}%`; $('#fitOverlayImage').style.opacity = String(Number(opacity)/100); $('#fitOverlayImage').style.left = `${x}%`; $('#fitOverlayImage').style.top = `${y}%`;
  }
  ['overlayScale','overlayOpacity','overlayX','overlayY'].forEach(id => $('#'+id).addEventListener('input', updateOverlayControls));
  $('#resetOverlay').addEventListener('click', () => {
    $('#overlayScale').value='38'; $('#overlayOpacity').value='85'; $('#overlayX').value='50'; $('#overlayY').value='48'; updateOverlayControls();
    if (state.photoUrl) drawPhotoPreview(); else setStudioProduct(state.activeProductId);
    toast('Fit preview reset.');
  });
  $('#downloadFitPreview').addEventListener('click', () => {
    if (!state.photoUrl) { toast('Choose your own photo first.'); return; }
    const product = productById.get(state.activeProductId);
    const canvas = document.createElement('canvas'); canvas.width=800; canvas.height=1000;
    const ctx = canvas.getContext('2d'); if (!ctx) { toast('Preview export is not supported here.'); return; }
    const photo = new Image(); photo.onload = () => {
      try {
        ctx.fillStyle='#160f16'; ctx.fillRect(0,0,canvas.width,canvas.height);
        const ratio=Math.min(canvas.width/photo.naturalWidth,canvas.height/photo.naturalHeight); const w=photo.naturalWidth*ratio, h=photo.naturalHeight*ratio;
        ctx.drawImage(photo,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
        const save = () => {
          try { const link=document.createElement('a'); link.href=canvas.toDataURL('image/png'); link.download='blacked-fit-preview.png'; link.click(); toast('Preview downloaded. It is illustrative, not a fit result.'); }
          catch { toast('Export was blocked because an external asset cannot be safely drawn. Step 3 will bundle verified assets locally.'); }
        };
        if (product?.overlay) {
          const overlay = new Image(); overlay.crossOrigin='anonymous'; overlay.onload=()=>{ctx.globalAlpha=Number($('#overlayOpacity').value)/100; const ow=canvas.width*Number($('#overlayScale').value)/100; const oh=ow*(overlay.naturalHeight/overlay.naturalWidth); const ox=canvas.width*Number($('#overlayX').value)/100-ow/2; const oy=canvas.height*Number($('#overlayY').value)/100-oh/2; ctx.drawImage(overlay,ox,oy,ow,oh);ctx.globalAlpha=1;save();}; overlay.onerror=save; overlay.src=product.overlay;
        } else save();
      } catch { toast('Could not render this preview. You can still clear it or try another image.'); }
    };
    photo.onerror=()=>toast('Local image could not be rendered. Choose another image.'); photo.src=state.photoUrl;
  });

  // Fit Passport: read the legacy keys, but only persist new measurements if the user opts in.
  function restoreFitPassport() {
    const profile = safeRead(STORAGE.passport, null);
    if (profile && profile.values && typeof profile.values === 'object') {
      const mul = profile.unit === 'in' ? 2.54 : 1;
      for (const [field,id] of [['bust','fitBust'],['underbust','fitUnderbust'],['waist','fitWaist'],['hips','fitHips']]) {
        const input = $('#'+id); const value = Number(profile.values[field]);
        if (Number.isFinite(value) && value > 0) input.value = String(Math.round(value*mul*10)/10);
      }
      $('#saveFitPassport').checked = true;
      $('#fitPassportStatus').textContent = 'An existing Fit Passport was restored from this device. Check the values before relying on them.';
    }
  }
  $('#saveFitNotes').addEventListener('click', () => {
    const fields = {bust:Number($('#fitBust').value),underbust:Number($('#fitUnderbust').value),waist:Number($('#fitWaist').value),hips:Number($('#fitHips').value)};
    const supplied = Object.values(fields).some(value => value > 0);
    for (const [name,value] of Object.entries(fields)) if ($('#fit'+name[0].toUpperCase()+name.slice(1)).value && (!Number.isFinite(value) || value < 30 || value > 250)) { $('#fitPassportStatus').textContent = `${name} value must be between 30 and 250 cm, or left blank.`; return; }
    if (!$('#saveFitPassport').checked) { $('#fitPassportStatus').textContent = 'To persist measurements, opt in using the checkbox. Current values will not be saved.'; toast('Measurements not saved.'); return; }
    if (!supplied) { $('#fitPassportStatus').textContent = 'Enter at least one valid measurement before saving.'; return; }
    const valuesInches = Object.fromEntries(Object.entries(fields).map(([key,value]) => [key, value > 0 ? Math.round((value/2.54)*100)/100 : null]));
    if (safeWrite(STORAGE.passport,{values:valuesInches,unit:'in',updatedAt:new Date().toISOString()})) $('#fitPassportStatus').textContent = 'Fit Passport saved on this device only. Clear it below when no longer needed.';
    else $('#fitPassportStatus').textContent = 'Browser storage is unavailable. Measurements remain unsaved.';
  });
  $('#clearFitPassport').addEventListener('click', () => {
    safeRemove(STORAGE.passport); ['fitBust','fitUnderbust','fitWaist','fitHips'].forEach(id=>$('#'+id).value=''); $('#saveFitPassport').checked=false;
    $('#fitPassportStatus').textContent = 'Saved Fit Passport cleared from this browser. Other legacy data was not touched.';
    toast('Fit Passport cleared.');
  });

  // Preserve the earlier Fusion 3.1 label + notes feature and storage key. This is independent of Fit Passport measurements.
  function renderLegacyFitNote() {
    const note = state.fitNote;
    $('#fitNoteLabel').value = note?.label || '';
    $('#fitNotes').value = note?.notes || '';
    $('#fitNoteSummary').textContent = note && (note.label || note.notes) ? `${note.label || 'Fit note'}: ${note.notes || 'No extra notes.'}` : 'No fit notes saved yet.';
  }
  renderLegacyFitNote();
  if (state.fitNote && (state.fitNote.label || state.fitNote.notes)) $('#fitNoteStatus').textContent = 'An existing fit note was restored from this device.';
  $('#saveFitNote').addEventListener('click', () => {
    const label = $('#fitNoteLabel').value.trim().slice(0,100);
    const notes = $('#fitNotes').value.trim().slice(0,2000);
    if (!label && !notes) { $('#fitNoteStatus').textContent = 'Add a label or note first.'; return; }
    state.fitNote = { label, notes };
    if (safeWrite(STORAGE.fitNote, state.fitNote)) $('#fitNoteStatus').textContent = 'Fit note saved on this device only.';
    else $('#fitNoteStatus').textContent = 'Browser storage is unavailable. The note is available for this session only.';
    renderLegacyFitNote();
    if (safeRead(STORAGE.fitNote, null)) $('#fitNoteStatus').textContent = 'Fit note saved on this device only.';
    toast('Fit note saved locally.');
  });
  $('#clearFitNote').addEventListener('click', () => {
    state.fitNote = null;
    safeRemove(STORAGE.fitNote);
    $('#fitNoteLabel').value = ''; $('#fitNotes').value = '';
    $('#fitNoteSummary').textContent = 'No fit notes saved yet.';
    $('#fitNoteStatus').textContent = 'Fit note cleared. Other saved data was not changed.';
    toast('Fit note cleared.');
  });
  $('#runFitDetective').addEventListener('click', () => {
    const guides = {
      band: 'Check that the band sits level around your body. If it rides up, feels painfully tight or leaves skin injury, stop and review the garment instructions and sizing chart. No calculator can guarantee a fit.',
      strap: 'Adjust straps gently, then check whether the band is supporting the garment. Strap slip/digging can have several causes; do not keep wearing something that hurts.',
      cup: 'Compare the garment shape and size guidance with your body comfort. Spillage or gaping does not reveal a single guaranteed size; try the seller’s documented fit guide if available.',
      brief: 'Check whether the waist and leg opening feel comfortably secure without pinching or painful pressure. Use the actual garment’s waist/hip chart if one is verified.',
      general: 'Note what feels comfortable, what shifts while moving and any points of pressure. If pain, numbness or skin injury continues, stop wearing the garment and seek appropriate advice.'
    };
    $('#fitDetectiveResult').textContent = guides[$('#fitProblem').value] || guides.general;
  });

  // 8-frame concept viewer; image names are source-mapped and explicitly labelled as generated concepts.
  let angleIndex = 0;
  function showAngle(next) {
    angleIndex = (next + C.wheelFrames.length) % C.wheelFrames.length;
    const frame = C.wheelFrames[angleIndex];
    setImageSource($('#angleImage'), frame.image, `Illustrative concept angle ${angleIndex+1} of ${C.wheelFrames.length}: ${frame.name}`);
    $('#angleSlider').value = String(angleIndex); $('#angleLabel').textContent = `${String(angleIndex+1).padStart(2,'0')} / ${String(C.wheelFrames.length).padStart(2,'0')} · ${frame.name}`;
  }
  $('#anglePrev').addEventListener('click',()=>showAngle(angleIndex-1));
  $('#angleNext').addEventListener('click',()=>showAngle(angleIndex+1));
  $('#angleSlider').addEventListener('input',event=>showAngle(Number(event.target.value)));

  // Sanskari, Boyfriend and Wellness galleries share the same truthful image fallback / lightbox behavior.
  function renderGallery(items, targetId, className = 'gallery-grid', type = 'gallery') {
    const target=$('#'+targetId);
    target.className=className;
    target.innerHTML=items.map((item,index)=>`<article class="gallery-card"><button class="gallery-open media-frame" type="button" data-gallery="${escapeHtml(type)}" data-gallery-index="${index}" aria-label="Preview ${escapeHtml(item.title)}"><img loading="lazy" decoding="async" crossorigin="anonymous" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"><span class="media-fallback" hidden>Original image unavailable. See the asset report.</span></button><div class="gallery-copy"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.type || item.note || 'Illustrative reference; specifications not verified.')}</p></div></article>`).join('');
  }
  renderGallery(C.sanskari,'sanskariGrid','sanskari-grid','sanskari');
  renderGallery(C.muslimCollection,'muslimGrid','gallery-grid muslim-grid','muslim');
  renderGallery(C.christianCollection,'christianGrid','gallery-grid christian-grid','christian');
  renderGallery(C.boyfriendGallery,'boyfriendGallery','gallery-grid','boyfriend');
  renderGallery(C.wellnessGallery,'wellnessGallery','gallery-grid','wellness');
  function collectionItems(type) { return type === 'sanskari' ? C.sanskari : type === 'muslim' ? C.muslimCollection : type === 'christian' ? C.christianCollection : type === 'boyfriend' ? C.boyfriendGallery : C.wellnessGallery; }
  function openLightbox(type,index) {
    const items=collectionItems(type); const item=items[index]; if(!item) return;
    $('#lightboxTitle').textContent=item.title; setImageSource($('#lightboxImage'),item.image,item.title);
    $('#lightboxCaption').textContent=item.type || item.note || 'Campaign reference only; not verified product inventory.';
    openDialog($('#lightboxDialog'));
  }

  // Original wheel location 1 + 2: remain within Wellness; adult self-attestation is explicit.
  const wheelResultLines = {
    dildo: {
      small:['Compact-format concept selected. Review the manufacturer’s actual dimensions and safety instructions.','Compact preference selected for this demo. This is not medical advice.'],
      medium:['Medium-format concept selected. Check actual product dimensions and comfort guidance.','Medium preference selected for this demo only; it is not a verified product recommendation.'],
      large:['Larger-format concept selected. Never push through pain or discomfort; verify real dimensions.','Larger preference selected for this demo only.'],
      compact:['Compact-format concept selected. Check the real manufacturer details.'], standard:['Standard-format concept selected. Verify the actual item dimensions.'], wide:['Wider-format concept selected. This demo does not recommend a specific product.'],
      surprise:['Surprise category selected for fun. Verify product safety and manufacturer instructions before any real purchase.']
    },
    plug: {
      compact:['Compact preference selected. Use only a body-safe product designed for this purpose and follow its instructions.'],
      standard:['Standard preference selected. This demo does not verify exact dimensions or safety certifications.'],
      wide:['Wider preference selected. Comfort and safety are individual; never continue through pain.'],
      surprise:['Surprise category selected for fun, not a product recommendation.']
    },
    boyfriend: {
      gentle:['Easygoing vibe: choose a cosy public date and ask what would feel comfortable for both.','Easygoing pick: share a no-pressure plan and keep the timing flexible.'],
      playful:['Playful vibe: trade one kind compliment and one silly question.','Playful pick: choose a tiny shared challenge that either person can skip.'],
      bold:['Bold banter: try a confident compliment, then leave room for the other person’s response.','Bold pick: agree on a date idea together; no answer is owed.'],
      surprise:['Demo surprise: a small thoughtful message or public date idea. This is not a redeemable deal.']
    }
  };
  function spinOriginalWheel(type) {
    const ageChecked = type === 'boyfriend' ? $('#boyAdultConfirm').checked : $('#wellnessAdultConfirm').checked;
    if (!ageChecked) { toast('Please confirm that you are 18 or older first.'); (type==='boyfriend' ? $('#boyAdultConfirm') : $('#wellnessAdultConfirm')).focus(); return; }
    const selectId = type==='dildo' ? 'dildoPreference' : type==='plug' ? 'plugPreference' : 'boyPreference';
    const resultId = type==='dildo' ? 'dildoResult' : type==='plug' ? 'plugResult' : 'boyResult';
    const visualId = type==='dildo' ? 'dildoWheelVisual' : type==='plug' ? 'plugWheelVisual' : 'boyWheelVisual';
    const selected=$('#'+selectId).value;
    const eligible=selected==='surprise' ? (type==='dildo'?['small','medium','large']:type==='plug'?['compact','standard','wide']:['gentle','playful','bold']) : [selected];
    const key=eligible[Math.floor(Math.random()*eligible.length)];
    const lines=(wheelResultLines[type][key]||wheelResultLines[type].surprise);
    const line=lines[Math.floor(Math.random()*lines.length)];
    state.wheelRotations[type] += 720 + Math.floor(Math.random()*360);
    $('#'+visualId).style.transform=`rotate(${state.wheelRotations[type]}deg)`;
    $('#'+resultId).textContent= type==='boyfriend' ? `${line} No real discount code or checkout is connected.` : line;
  }
  $('#spinDildoWheel').addEventListener('click',()=>spinOriginalWheel('dildo'));
  $('#spinPlugWheel').addEventListener('click',()=>spinOriginalWheel('plug'));
  $('#spinBoyWheel').addEventListener('click',()=>spinOriginalWheel('boyfriend'));
  $('#resetBoyWheel').addEventListener('click',()=>{state.wheelRotations.boyfriend=0;$('#boyWheelVisual').style.transform='rotate(0deg)';$('#boyPreference').selectedIndex=0;$('#boyResult').textContent='Round reset. Choose a vibe, confirm 18+, and spin again. No real discount is connected.';});
  function resetOriginalWheel(type) {
    const resultId=type==='dildo'?'dildoResult':'plugResult';
    const selectId=type==='dildo'?'dildoPreference':'plugPreference';
    const visualId=type==='dildo'?'dildoWheelVisual':'plugWheelVisual';
    state.wheelRotations[type]=0; $('#'+visualId).style.transform='rotate(0deg)'; $('#'+selectId).selectedIndex=0;
    $('#'+resultId).textContent='Round reset. Choose a preference, confirm 18+, and spin again.';
  }
  $('#resetDildoWheel').addEventListener('click',()=>resetOriginalWheel('dildo'));
  $('#resetPlugWheel').addEventListener('click',()=>resetOriginalWheel('plug'));

  // Original 3rd wheel inside Boyfriend; all outcomes are optional non-real offers.
  const boyfriendWheelResults = {
    gentle:'Easygoing result: plan a calm coffee or bookshop date. Sample reward is illustrative only.',
    playful:'Playful result: trade one silly compliment and choose the playlist together. Sample reward is illustrative only.',
    bold:'Bold banter result: share a confident but respectful message. Sample reward is illustrative only.',
    surprise:'Surprise result: plan a small thoughtful moment. No real discount, purchase or booking is created.'
  };

  // New Dirty/Wild wheel: category state controls the prompt pool; skip/reset are real behaviors.
  function selectDirtyCategory(category) {
    if (!C.dirtyCategories[category]) return;
    state.dirtyCategory=category;
    $$('#dirtyCategoryButtons .category-chip').forEach(button=>{
      const active=button.dataset.dirtyCategory===category;
      button.setAttribute('aria-pressed',String(active));
    });
    $('#dirtyWheelResult').innerHTML=`<span class="result-kicker">${escapeHtml(C.dirtyCategories[category].label)}</span><strong>Ready when you are.</strong><p>Spin for an optional prompt. You can skip or stop at any time.</p>`;
  }
  function renderDirtyCategoryButtons() {
    $('#dirtyCategoryButtons').innerHTML=Object.entries(C.dirtyCategories).map(([key,info])=>`<button class="category-chip" type="button" data-dirty-category="${escapeHtml(key)}" aria-pressed="${key===state.dirtyCategory}">${escapeHtml(info.label)}</button>`).join('');
  }
  renderDirtyCategoryButtons();
  $('#dirtyCategoryButtons').addEventListener('click',event=>{const button=event.target.closest('[data-dirty-category]');if(button)selectDirtyCategory(button.dataset.dirtyCategory);});
  function chooseDirtyPrompt() {
    if (!$('#dirtyAdultConfirm').checked) { toast('Please confirm that you are 18 or older first.'); $('#dirtyAdultConfirm').focus(); return; }
    const category=C.dirtyCategories[state.dirtyCategory];
    if(!category) return;
    const available=category.prompts.filter(prompt=>prompt!==state.lastDirtyPrompt);
    const pool=available.length?available:category.prompts;
    const prompt=pool[Math.floor(Math.random()*pool.length)];
    state.lastDirtyPrompt=prompt;
    state.dirtyRotation += 1080 + Math.floor(Math.random()*720);
    $('#dirtyWheelVisual').style.transform=`rotate(${state.dirtyRotation}deg)`;
    $('#dirtyWheelResult').innerHTML=`<span class="result-kicker">${escapeHtml(category.label.toUpperCase())} · OPTIONAL PROMPT</span><strong>${escapeHtml(prompt)}</strong><p>Both people may pass or stop. A prompt is never a requirement.</p>`;
    $('#dirtyWheelStatus').textContent='Prompt generated in this browser. It has not been published or sent to anyone.';
  }
  $('#spinDirtyWheel').addEventListener('click',chooseDirtyPrompt);
  $('#skipDirtyPrompt').addEventListener('click',()=>{if(!$('#dirtyAdultConfirm').checked){toast('Please confirm that you are 18 or older first.');return;}chooseDirtyPrompt();$('#dirtyWheelStatus').textContent='Skipped or replaced with another optional prompt.';});
  $('#resetDirtyWheel').addEventListener('click',()=>{state.lastDirtyPrompt=null;state.dirtyRotation=0;$('#dirtyWheelVisual').style.transform='rotate(0deg)';$('#dirtyWheelResult').innerHTML='<span class="result-kicker">YOUR RESULT</span><strong>Choose a category and spin.</strong><p>You may skip any prompt, with no explanation required.</p>';$('#dirtyWheelStatus').textContent='Round reset.';});

  // Date planner and message helper. Outputs are locally generated; no messaging service is connected.
  const dateIdeas = {
    cozy: {low:['Make tea or coffee at home and trade three favourite songs.','Take a calm evening walk in a public, familiar place.'],medium:['Visit a quiet café and try a dessert you have not shared before.','Pick a bookstore or gallery and choose one thing to discuss.'],special:['Reserve a quiet dinner after confirming both schedules.','Plan a cosy evening with a shared playlist and favourite food.']},
    playful:{low:['Take a photo walk and find three funny details.','Play a quick question game over snacks.'],medium:['Visit a board-game café or arcade and take turns choosing games.','Try a new street-food spot in a busy, public area.'],special:['Plan a themed date night with a dress colour or music mood you both agree on.']},
    creative:{low:['Draw portraits of each other in five minutes—bad drawings welcome.','Make a playlist for a fictional film you invent together.'],medium:['Try a pottery, painting or cooking workshop.','Visit a museum or local art market and pick a favourite work.'],special:['Book a short class or creative experience that both people choose.']},
    outdoors:{low:['Go for a daytime walk in a public park and bring water.','Watch sunset from a familiar public place.'],medium:['Try a botanical garden, cycling path or guided public tour.'],special:['Plan a day trip with transport, weather and return details checked together.']},
    romantic:{low:['Write one appreciation note each and read them only if both want to.','Make dinner together and each choose one song.'],medium:['Plan a sunset café visit and leave time for unhurried conversation.'],special:['Choose a dinner or event together, confirm budget and timing first.']}
  };
  $('#makeDate').addEventListener('click',()=>{
    const mood=$('#dateMood').value, budget=$('#dateBudget').value;
    const options=dateIdeas[mood]?.[budget]||dateIdeas[mood]?.medium||dateIdeas.cozy.low;
    $('#dateResult').textContent=options[Math.floor(Math.random()*options.length)]+' Check preferences and logistics together; this is an idea, not a booking.';
  });
  const messageBank = {
    sweet:{thinking:['You crossed my mind today, so I wanted to send a little smile your way.','No big reason—just wanted you to know I appreciate you.'],date:['Want to plan a small date this week? You choose the mood, I’ll help with the details.'],thanks:['Thank you for making time for me. It meant more than I said.'],conversation:['What is one little thing that made your day better?'],boundary:['Can we talk about what feels comfortable for both of us? I want us both to feel heard.']},
    playful:{thinking:['Important notice: you have been nominated for making me smile.','I was going to act mysterious, but then I remembered I like talking to you.'],date:['Your mission, should you accept: choose snacks. I’ll choose the playlist.'],thanks:['Thanks for being excellent company. Five stars; would hang out again.'],conversation:['Quick question: what is your most unnecessary but strongest opinion?'],boundary:['Tiny serious moment: what is a good way for us to say “pause” if something feels off?']},
    honest:{thinking:['I have been thinking about you and wanted to say it plainly.','I like the time we spend together. Just wanted to be honest about that.'],date:['I would enjoy seeing you. Are you free sometime this week? No pressure if not.'],thanks:['I appreciated what you did. Thank you for showing up.'],conversation:['How have you really been feeling lately? I’m here to listen.'],boundary:['I want us to be able to say what we like or do not like without feeling judged.']},
    apology:{thinking:['I owe you an apology for how I handled that. I want to listen and understand.'],date:['When you feel ready, could we talk and make a better plan together?'],thanks:['Thank you for hearing me out. I know trust comes from actions, not only words.'],conversation:['Can I listen to your side without interrupting?'],boundary:['I want to understand the boundary I crossed and respect what you need next.']},
    flirty:{thinking:['I had a clever line ready, but then your smile distracted the whole plan.','You make an ordinary day feel a little less ordinary.'],date:['Coffee with me? I’ll bring the conversation; you bring your favourite opinion.'],thanks:['That little moment with you is still making me smile.'],conversation:['What is your idea of a perfect little escape from a busy day?'],boundary:['I like the flirting, and I also want to check that this tone feels good for you.']}
  };
  let currentMessage='';
  $('#makeMessage').addEventListener('click',()=>{
    const tone=$('#messageTone').value, moment=$('#messageMoment').value;
    const pool=messageBank[tone]?.[moment]||messageBank.sweet.thinking;
    currentMessage=pool[Math.floor(Math.random()*pool.length)]; $('#messageResult').textContent=currentMessage; $('#messageCopyStatus').textContent='Edit the wording so it sounds like you before sending.';
  });
  async function copyText(text, statusEl) {
    if (!text) { if(statusEl) statusEl.textContent='Create or select some text first.'; return; }
    try { await navigator.clipboard.writeText(text); if(statusEl)statusEl.textContent='Copied.'; toast('Copied to clipboard.'); }
    catch {
      const area=document.createElement('textarea'); area.value=text; area.setAttribute('aria-label','Text selected for manual copy'); area.style.position='fixed'; area.style.opacity='0'; document.body.append(area); area.select();
      let selected=false; try { selected=document.execCommand('copy'); } catch {}
      area.remove(); if(statusEl)statusEl.textContent=selected?'Copied.':'Clipboard access is blocked. Select and copy the visible text manually.';
    }
  }
  $('#copyMessage').addEventListener('click',()=>copyText(currentMessage,$('#messageCopyStatus')));
  const conversationPrompts=[
    'What helps you feel appreciated and understood?', 'What is a boundary that helps you feel safe and respected?', 'What would make our next date feel easy and enjoyable?', 'What is one small thing we could do to make more time for each other?', 'Is there a topic you would like to discuss—or would rather skip today?'
  ];
  let currentConversationPrompt=conversationPrompts[0];
  $('#nextConversationPrompt').addEventListener('click',()=>{let next=currentConversationPrompt;while(next===currentConversationPrompt&&conversationPrompts.length>1)next=conversationPrompts[Math.floor(Math.random()*conversationPrompts.length)];currentConversationPrompt=next;$('#conversationPrompt').textContent=next;$('#conversationCopyStatus').textContent='';});
  $('#copyConversationPrompt').addEventListener('click',()=>copyText(currentConversationPrompt,$('#conversationCopyStatus')));

  // Local Brand Studio drafts: real edit/save/export actions, no fake GitHub publish button.
  let drafts=Array.isArray(safeRead(STORAGE.drafts,[]))?safeRead(STORAGE.drafts,[]):[];
  function renderDrafts() {
    $('#draftCount').textContent=`${drafts.length} draft${drafts.length===1?'':'s'}`;
    const target=$('#draftList');
    if(!drafts.length){target.innerHTML='<p class="empty-state">No local drafts yet.</p>';return;}
    target.innerHTML=drafts.map(draft=>`<article class="issue-item"><div><h3>${escapeHtml(draft.title)}</h3><p><strong>Section:</strong> ${escapeHtml(draft.section)} · ${draft.conceptOnly?'Concept/reference':'Unverified content'}</p><p>${escapeHtml(draft.description||'No description added.')}</p>${draft.image?`<p class="micro-note">Image source/file name: ${escapeHtml(draft.image)}</p>`:''}<div class="button-row"><button class="small-button" type="button" data-draft-export="${escapeHtml(draft.id)}">Export this draft</button><button class="small-button" type="button" data-draft-delete="${escapeHtml(draft.id)}">Delete</button></div></div></article>`).join('');
  }
  let draftImageObjectUrl=null;
  $('#draftLocalImage').addEventListener('change',event=>{
    const file=event.target.files?.[0]; if(draftImageObjectUrl) URL.revokeObjectURL(draftImageObjectUrl); draftImageObjectUrl=null;
    if(!file){$('#draftImagePreview').hidden=true;return;}
    if(!file.type.startsWith('image/')||file.size>15*1024*1024){toast('Choose an image under 15 MB.');event.target.value='';$('#draftImagePreview').hidden=true;return;}
    draftImageObjectUrl=URL.createObjectURL(file);$('#draftImagePreviewImg').src=draftImageObjectUrl;$('#draftImagePreview').hidden=false;$('#draftImageUrl').value=file.name;
  });
  $('#brandDraftForm').addEventListener('submit',event=>{
    event.preventDefault();
    const title=$('#draftTitle').value.trim(); if(!title){$('#draftStatus').textContent='Add a title first.';return;}
    const draft={id:`draft-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,title,section:$('#draftSection').value,description:$('#draftDescription').value.trim(),image:$('#draftImageUrl').value.trim(),conceptOnly:$('#draftConceptOnly').checked,createdAt:new Date().toISOString()};
    drafts.unshift(draft); if(!safeWrite(STORAGE.drafts,drafts)) $('#draftStatus').textContent='Saved for this session only; browser storage is blocked.'; else $('#draftStatus').textContent='Draft saved in local browser storage. It is not published to GitHub.';
    $('#draftTitle').value='';$('#draftDescription').value='';if(!$('#draftLocalImage').files?.length)$('#draftImageUrl').value='';$('#draftConceptOnly').checked=true;renderDrafts();toast('Local draft saved.');
  });
  function downloadBlob(filename, content, mime='application/json') {
    const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('#exportDrafts').addEventListener('click',()=>downloadBlob('blacked-brand-studio-drafts.json',JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),drafts},null,2)));
  $('#draftList').addEventListener('click',event=>{
    const del=event.target.closest('[data-draft-delete]'); if(del){drafts=drafts.filter(d=>d.id!==del.dataset.draftDelete);safeWrite(STORAGE.drafts,drafts);renderDrafts();toast('Draft deleted.');return;}
    const one=event.target.closest('[data-draft-export]');if(one){const draft=drafts.find(d=>d.id===one.dataset.draftExport);if(draft)downloadBlob(`${draft.section}-draft.json`,JSON.stringify(draft,null,2));}
  });
  $('#clearDrafts').addEventListener('click',()=>{drafts=[];safeWrite(STORAGE.drafts,drafts);renderDrafts();toast('Local drafts cleared.');});

  const checkpointText=$('#checkpointText');
  $('#copyCheckpoint').addEventListener('click',()=>copyText(checkpointText?.textContent||'',$('#copyStatus')));
  $('#downloadCheckpoint').addEventListener('click',()=>downloadBlob('BLACKED-V1-STEP3-HANDOFF.txt',checkpointText?.textContent||'','text/plain;charset=utf-8'));

  // Global interaction delegation for catalogue cards, galleries and legacy bag data.
  document.addEventListener('click',event=>{
    const save=event.target.closest('[data-save]'); if(save){event.preventDefault();event.stopPropagation();toggleWishlist(save.dataset.save);return;}
    const removeSave=event.target.closest('[data-remove-save]'); if(removeSave){toggleWishlist(removeSave.dataset.removeSave);return;}
    const compare=event.target.closest('[data-compare]'); if(compare){toggleCompare(compare.dataset.compare);return;}
    const removeCompare=event.target.closest('[data-remove-compare]');if(removeCompare){state.compare=state.compare.filter(id=>id!==removeCompare.dataset.removeCompare);renderCatalog();renderCompare();return;}
    const detail=event.target.closest('[data-details]'); if(detail){openProduct(detail.dataset.details);return;}
    const gallery=event.target.closest('[data-gallery]');if(gallery){openLightbox(gallery.dataset.gallery,Number(gallery.dataset.galleryIndex));return;}
    const bagRemove=event.target.closest('[data-bag-remove]');if(bagRemove){state.bag.splice(Number(bagRemove.dataset.bagRemove),1);safeWrite(STORAGE.bag,state.bag);renderBag();toast('Removed from demo bag.');return;}
    const bagStep=event.target.closest('[data-bag-step]');if(bagStep){const i=Number(bagStep.dataset.bagStep);const item=state.bag[i];if(item){item.qty=Math.max(0,Math.min(99,(Number(item.qty)||1)+Number(bagStep.dataset.step)));if(item.qty===0)state.bag.splice(i,1);safeWrite(STORAGE.bag,state.bag);renderBag();}return;}
  });
  $('#catalogSearch').addEventListener('input',renderCatalog);
  $('#catalogCategory').addEventListener('change',renderCatalog);
  $('#catalogSort').addEventListener('change',renderCatalog);
  $('#clearCatalogFilters').addEventListener('click',()=>{$('#catalogSearch').value='';$('#catalogCategory').value='all';$('#catalogSort').value='featured';renderCatalog();});
  $('#clearCompare').addEventListener('click',()=>{state.compare=[];renderCatalog();renderCompare();toast('Comparison cleared.');});
  $('#saveProductFromDialog').addEventListener('click',()=>{if(state.detailProductId)toggleWishlist(state.detailProductId);});
  $('#compareProductFromDialog').addEventListener('click',()=>{if(state.detailProductId)toggleCompare(state.detailProductId);});
  $('#fitProductFromDialog').addEventListener('click',()=>{const id=state.detailProductId;closeDialog(productDialog);setStudioProduct(id);activateView('innerwear');setTimeout(()=>$('#fitStudioTitle').scrollIntoView({behavior:'smooth',block:'start'}),50);});
  $('#addDemoBag').addEventListener('click',()=>{if(state.detailProductId)addDemoBag(state.detailProductId);});

  // Size conversion: exact units only, no universal sizing claim.
  function updateMeasureResult() {
    const value=Number($('#measureValue').value);if(!Number.isFinite(value)||value<0||value>400){$('#measureResult').textContent='Enter a measurement from 0 to 400.';return;}
    const other=state.measureUnit==='cm'?value/2.54:value*2.54;
    $('#measureResult').textContent=state.measureUnit==='cm'?`${value} cm = ${other.toFixed(2)} in`:`${value} in = ${other.toFixed(2)} cm`;
  }
  $('#measureValue').addEventListener('input',updateMeasureResult);
  $$('[data-unit]').forEach(button=>button.addEventListener('click',()=>{
    const requested=button.dataset.unit;if(requested===state.measureUnit)return;
    const current=Number($('#measureValue').value);if(Number.isFinite(current)&&current>=0&&current<=400)$('#measureValue').value=(requested==='in'?current/2.54:current*2.54).toFixed(2).replace(/\.00$/,'');
    state.measureUnit=requested;$$('[data-unit]').forEach(node=>{const active=node===button;node.classList.toggle('active',active);node.setAttribute('aria-pressed',String(active));});updateMeasureResult();
  }));

  // Make every wheel input actionable and the current category explicit.
  $('#dildoPreference').addEventListener('change',()=>$('#dildoResult').textContent=`Preference changed to ${$('#dildoPreference').selectedOptions[0].text}. Confirm 18+ and spin to get a demo prompt.`);
  $('#plugPreference').addEventListener('change',()=>$('#plugResult').textContent=`Preference changed to ${$('#plugPreference').selectedOptions[0].text}. Confirm 18+ and spin to get a demo prompt.`);
  $('#boyPreference').addEventListener('change',()=>$('#boyResult').textContent=`Vibe changed to ${$('#boyPreference').selectedOptions[0].text}. Confirm 18+ and spin to get a local prompt.`);

  // Final delegated controls for detail modal and wheel state changes.
  $('#productDialog').addEventListener('close',()=>{state.detailProductId=null;});
  restoreFitPassport(); updateOverlayControls(); setStudioProduct(state.activeProductId); showAngle(0); fillStyleBoardSelects(); renderStyleFinder(); renderCatalog(); renderBag(); renderDrafts(); updateMeasureResult();

  // PWA shell cache is scoped to this repository path; remote campaign images are deliberately not cached as if local.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !location.hostname.includes('localhost') && !location.hostname.endsWith('.test')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{ /* visible UI continues without offline cache */ }));
  }
})();
