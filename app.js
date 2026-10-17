(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toastEl = $('#toast');
  let toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
  }

  // Mobile navigation
  const menuToggle = $('#menuToggle');
  const primaryNav = $('#primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      primaryNav.classList.toggle('is-open', !isOpen);
    });
    $$('a', primaryNav).forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  // Collection filtering
  const filterButtons = $$('.filter-chip');
  const productCards = $$('.product-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      productCards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  const products = {
    move: { name: 'Move Together', category: '01 · BLACKED CAMPAIGN', image: 'ref-01-blacked-move-together.png', description: 'Black-and-grey movement-inspired styling from your original campaign artwork.', note: 'Campaign visual only. Confirm the exact garment SKU, materials, sizes and stock before selling.' },
    yoga: { name: 'Yoga Together', category: '02 · BLACKED CAMPAIGN', image: 'ref-02-blacked-yoga-together.png', description: 'Your original warm-studio campaign visual with the “Yoga Together” message.', note: 'Campaign visual only. It is not a separate confirmed product SKU by itself.' },
    redlace: { name: 'Red Lace Bodysuit', category: '03 · DESIGN REFERENCE', image: 'ref-03-red-lace-bodysuit-reference.png', description: 'Red lace and strappy construction reference from the image you supplied.', note: 'Reference image includes another brand name/packaging. Not confirmed BLACKED inventory; do not list it for sale as a BLACKED product without your own product and usage rights.' },
    stretch: { name: 'Movement & Stretch', category: '04 · SHOOT REFERENCE', image: 'ref-04-movement-stretch-reference.png', description: 'A movement-focused studio photo reference for an active, comfortable brand direction.', note: 'Reference photo only. Product identity, ownership and final product specifications have not been confirmed.' },
    blacklace: { name: 'Black Lace Cut-Out Set', category: '05 · DESIGN REFERENCE', image: 'ref-05-black-lace-cutout-reference.png', description: 'Black lace pattern, cut-out and matching-set styling reference.', note: 'The image itself contains other-brand text. It is a design reference, not confirmed BLACKED stock.' },
    velvet: { name: 'Velvet Lace Set', category: '06 · DESIGN REFERENCE', image: 'ref-06-velvet-lace-reference.png', description: 'Pink velvet with black lace detailing from your supplied visual reference.', note: 'Reference image only. Confirm your actual product design, fabric, dimensions and rights before using it as a shop listing.' },
    rose: { name: 'Rose Strap Mannequin Set', category: '07 · PRODUCT DETAIL REFERENCE', image: 'ref-07-rose-strap-mannequin-reference.jpg', description: 'A red strappy design with rose and pearl decorative details, as shown in your original screenshot.', note: 'This is an external social-media screenshot with interface and branding visible; use it for private design inspiration only unless you have permission.' },
    butterfly: { name: 'Pink Butterfly Lace Detail', category: '08 · PRODUCT DETAIL REFERENCE', image: 'ref-08-pink-butterfly-detail-reference.jpg', description: 'Close-up reference of a pink butterfly-inspired lace detail.', note: 'Close-up only; the photo does not establish the complete garment, construction, fit, or a BLACKED product SKU.' },
    signature: { name: 'Black Comfort Set', category: '09 · BLACKED CAMPAIGN', image: 'ref-09-blacked-comfort-set.png', description: 'Your BLACKED campaign creative featuring a black matching set and comfort-led positioning.', note: 'Campaign image, not a verified catalogue SKU. Confirm actual product photography, price, sizes and stock.' },
    together: { name: 'Better Together', category: '10 · BLACKED CAMPAIGN', image: 'ref-10-blacked-better-together.png', description: 'Your second original BLACKED campaign visual in a warm, premium lifestyle setting.', note: 'Campaign image, not a separate confirmed product SKU. Confirm actual product details before selling.' },
    sculpt: { name: 'Midnight Sculpt', category: '11 · BLACKED DESIGN CONCEPT', image: 'design-11-midnight-sculpt.png', previewImage: 'design-11-midnight-sculpt-product.jpg', description: 'Charcoal cups with black lace accents and a matching strappy brief; based on your supplied concept artwork.', note: 'Concept design only. The selected product view shows a garment-detail concept image, not verified sale stock.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    midnight: { name: 'Midnight Lace', category: '12 · BLACKED DESIGN CONCEPT', image: 'design-12-midnight-lace.png', previewImage: 'design-12-midnight-lace-product.jpg', description: 'Black floral lace with adjustable strappy details and a matching brief; concept inspired by your supplied artwork.', note: 'Concept design only. Confirm final construction, sizing, inventory and commercial product photography before selling.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    scarlet: { name: 'Scarlet Satin', category: '13 · BLACKED DESIGN CONCEPT', image: 'design-13-scarlet-satin.png', previewImage: 'design-13-scarlet-satin-product.jpg', description: 'A deep burgundy satin-and-lace matching set concept from your supplied artwork.', note: 'Concept design only. The garment-detail image is a visual direction, not evidence of final product availability.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    ivory: { name: 'Ivory Bloom', category: '14 · BLACKED DESIGN CONCEPT', image: 'design-14-ivory-bloom.png', previewImage: 'design-14-ivory-bloom-product.jpg', description: 'Ivory lingerie with delicate floral embroidery and small bow details, based on your supplied concept image.', note: 'Concept design only. Verify fabric, product construction, sizes and stock before listing for sale.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    'syrn-demi': { name: 'Forever Yours Lightly Lined Demi Bra', category: 'SYRN · EXTERNAL STYLE INSPIRATION', image: 'syrn-forever-yours.svg', previewImage: 'syrn-forever-yours.svg', description: 'External style reference: smooth-cup demi bra, adjustable straps and lace accents.', note: 'SYRN is a separate brand. This is an original schematic illustration and is not a BLACKED product or official product photography.', previewNote: 'EXTERNAL SYRN STYLE INSPIRATION · NOT BLACKED STOCK' },
    'syrn-balconette': { name: 'Forget Me Not Unlined Balconette Bra', category: 'SYRN · EXTERNAL STYLE INSPIRATION', image: 'syrn-forget-me-not.svg', previewImage: 'syrn-forget-me-not.svg', description: 'External style reference: unlined balconette shape, adjustable/convertible straps and lace detailing.', note: 'SYRN is a separate brand. This original schematic is for style inspiration only, not an official photo or a BLACKED product.', previewNote: 'EXTERNAL SYRN STYLE INSPIRATION · NOT BLACKED STOCK' },
    'syrn-bodysuit': { name: 'The Fantasy Lace Halter Bodysuit', category: 'SYRN · EXTERNAL STYLE INSPIRATION', image: 'syrn-fantasy-bodysuit.svg', previewImage: 'syrn-fantasy-bodysuit.svg', description: 'External style reference: floral lace, halter neckline and open-back bodysuit direction.', note: 'SYRN is a separate brand. This original schematic is not official product photography and is not available for sale through BLACKED.', previewNote: 'EXTERNAL SYRN STYLE INSPIRATION · NOT BLACKED STOCK' },
  };
  // Product reference metadata for non-commercial prototype decisions. These are visual references, not confirmed SKUs.
  const productMeta = {
    move: { source: 'BLACKED campaign visual', look: 'Charcoal / sporty set', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Balanced, active-inspired', sku: 'Not confirmed' },
    yoga: { source: 'BLACKED campaign visual', look: 'Movement-inspired set', styles: ['movement'], colors: ['black'], coverage: 'Balanced, active-inspired', sku: 'Not confirmed' },
    redlace: { source: 'Design reference', look: 'Red lace / strappy bodysuit', styles: ['lace', 'statement'], colors: ['red'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    stretch: { source: 'Shoot reference', look: 'Black movement styling', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Sport-inspired', sku: 'Not confirmed' },
    blacklace: { source: 'Design reference', look: 'Black lace / cut-out set', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    velvet: { source: 'Design reference', look: 'Pink velvet / black lace', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    rose: { source: 'Product-detail reference', look: 'Red decorative straps / rose accents', styles: ['statement'], colors: ['red'], coverage: 'Strappy / minimal', sku: 'Not confirmed' },
    butterfly: { source: 'Detail reference', look: 'Pink butterfly-inspired lace detail', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Detail reference only', sku: 'Not confirmed' },
    signature: { source: 'BLACKED campaign visual', look: 'Black comfort set', styles: ['everyday'], colors: ['black'], coverage: 'Comfort-led', sku: 'Not confirmed' },
    together: { source: 'BLACKED campaign visual', look: 'Black / red-accent comfort styling', styles: ['everyday', 'statement'], colors: ['black', 'red'], coverage: 'Comfort-led', sku: 'Not confirmed' },
    sculpt: { source: 'BLACKED concept', look: 'Charcoal / black lace', styles: ['lace', 'statement', 'everyday'], colors: ['black'], coverage: 'Balanced', sku: 'Concept only' },
    midnight: { source: 'BLACKED concept', look: 'Black floral lace / straps', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Minimal-detail reference', sku: 'Concept only' },
    scarlet: { source: 'BLACKED concept', look: 'Burgundy satin / lace', styles: ['lace', 'statement'], colors: ['red'], coverage: 'Balanced', sku: 'Concept only' },
    ivory: { source: 'BLACKED concept', look: 'Ivory floral embroidery', styles: ['lace', 'everyday'], colors: ['pink'], coverage: 'Balanced', sku: 'Concept only' },
    'syrn-demi': { source: 'External SYRN style inspiration', look: 'Smooth lined demi bra', styles: ['everyday'], colors: ['pink'], coverage: 'Balanced', sku: 'External reference only' },
    'syrn-balconette': { source: 'External SYRN style inspiration', look: 'Unlined lace balconette', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Lace-detail reference', sku: 'External reference only' },
    'syrn-bodysuit': { source: 'External SYRN style inspiration', look: 'Floral lace halter bodysuit', styles: ['lace', 'statement'], colors: ['red'], coverage: 'Bodysuit reference', sku: 'External reference only' }
  };

  // Device-local wishlist: stores only selected reference IDs, never personal photos.
  const wishlistKey = 'blacked-fit-studio-wishlist-v03';
  let savedProducts = new Set();
  try {
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    if (Array.isArray(storedWishlist)) savedProducts = new Set(storedWishlist.filter(id => Object.prototype.hasOwnProperty.call(products, id)));
  } catch (_) { /* local storage may be unavailable in private/restricted browser modes */ }
  const compareProducts = new Set();
  const wishlistGrid = $('#wishlistGrid');
  const comparePanel = $('#comparePanel');
  const compareResults = $('#compareResults');
  const savedCount = $('#savedCount');

  function persistWishlist() {
    try { localStorage.setItem(wishlistKey, JSON.stringify([...savedProducts])); }
    catch (_) { /* wishlist continues to work for this session if storage is blocked */ }
  }

  function renderWishlist() {
    if (savedCount) savedCount.textContent = String(savedProducts.size);
    if (!wishlistGrid) return;
    if (!savedProducts.size) {
      wishlistGrid.innerHTML = '<div class="saved-empty"><span>♡</span><p>Your wishlist is empty. Tap “Save style” on any of the ten references to keep it here.</p></div>';
      return;
    }
    wishlistGrid.innerHTML = [...savedProducts].map(id => {
      const product = products[id];
      const meta = productMeta[id] || {};
      return `<article class="saved-style-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="saved-style-copy"><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><div class="saved-style-actions"><button type="button" class="button button-dark button-small" data-saved-try="${id}">Open in try-on</button><button type="button" class="subtle-button" data-saved-remove="${id}">Remove</button></div></div></article>`;
    }).join('');
    $$('[data-saved-try]', wishlistGrid).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.savedTry, 'set')));
    $$('[data-saved-remove]', wishlistGrid).forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.savedRemove)));
  }

  function toggleWishlist(productId) {
    if (!products[productId]) return;
    if (savedProducts.has(productId)) {
      savedProducts.delete(productId);
      toast('Removed from saved styles.');
    } else {
      savedProducts.add(productId);
      toast('Saved on this device.');
    }
    persistWishlist();
    updateProductActionButtons();
    renderWishlist();
  }

  function updateProductActionButtons() {
    $$('[data-wishlist-toggle]').forEach(button => {
      const isSaved = savedProducts.has(button.dataset.wishlistToggle);
      button.classList.toggle('is-saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
      button.textContent = isSaved ? '♥ Saved' : '♡ Save style';
    });
    $$('[data-quiz-save]').forEach(button => {
      const isSaved = savedProducts.has(button.dataset.quizSave);
      button.classList.toggle('is-saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
      button.textContent = isSaved ? '♥ Saved' : '♡ Save';
    });
    $$('[data-compare-toggle]').forEach(button => {
      const isCompared = compareProducts.has(button.dataset.compareToggle);
      button.classList.toggle('is-compared', isCompared);
      button.setAttribute('aria-pressed', String(isCompared));
      button.textContent = isCompared ? '✓ Comparing' : '+ Compare';
    });
  }

  // Attach concise controls to each original reference card.
  productCards.forEach(card => {
    const productId = card.dataset.product;
    const tryButton = card.querySelector('[data-preview-product]');
    if (!productId || !tryButton || card.querySelector('.product-action-row')) return;
    tryButton.insertAdjacentHTML('afterend', `<div class="product-action-row"><button type="button" class="save-style-button" data-wishlist-toggle="${productId}" aria-pressed="false">♡ Save style</button><button type="button" class="compare-style-button" data-compare-toggle="${productId}" aria-pressed="false">+ Compare</button></div>`);
  });
  $$('[data-wishlist-toggle]').forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.wishlistToggle)));
  $$('[data-compare-toggle]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.compareToggle;
    if (compareProducts.has(id)) {
      compareProducts.delete(id);
    } else {
      if (compareProducts.size >= 3) { toast('Compare up to three references at a time.'); return; }
      compareProducts.add(id);
    }
    updateProductActionButtons();
    renderCompare();
    if (comparePanel && !comparePanel.hidden) comparePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));

  function renderCompare() {
    if (!comparePanel || !compareResults) return;
    comparePanel.hidden = compareProducts.size === 0;
    if (!compareProducts.size) { compareResults.innerHTML = ''; return; }
    if (compareProducts.size === 1) {
      const id = [...compareProducts][0];
      compareResults.innerHTML = `<div class="compare-one"><p><strong>${products[id].name}</strong> selected. Add one more reference to compare them side by side.</p></div>`;
      return;
    }
    compareResults.innerHTML = [...compareProducts].map(id => {
      const product = products[id];
      const meta = productMeta[id] || {};
      return `<article class="compare-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="compare-card-copy"><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><dl><div><dt>Visual direction</dt><dd>${meta.look || 'Reference visual'}</dd></div><div><dt>Coverage cue</dt><dd>${meta.coverage || 'Not specified'}</dd></div><div><dt>Confirmed SKU / price / stock</dt><dd>Not confirmed</dd></div></dl><button type="button" class="subtle-button" data-compare-remove="${id}">Remove from comparison</button><button type="button" class="text-link" data-compare-try="${id}">Open in try-on <span aria-hidden="true">→</span></button></div></article>`;
    }).join('');
    $$('[data-compare-remove]', compareResults).forEach(button => button.addEventListener('click', () => {
      compareProducts.delete(button.dataset.compareRemove);
      updateProductActionButtons(); renderCompare();
    }));
    $$('[data-compare-try]', compareResults).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.compareTry, 'set')));
  }
  $('#clearCompare')?.addEventListener('click', () => { compareProducts.clear(); updateProductActionButtons(); renderCompare(); });
  $('#clearWishlist')?.addEventListener('click', () => {
    savedProducts.clear(); persistWishlist(); updateProductActionButtons(); renderWishlist(); toast('Saved styles cleared from this device.');
  });
  renderWishlist();
  updateProductActionButtons();
  renderCompare();

  const productDialog = $('#productDialog');
  const dialogImage = $('#dialogImage');
  const dialogTitle = $('#dialogTitle');
  const dialogDescription = $('#dialogDescription');
  const dialogClose = $('#dialogClose');
  const dialogPreview = $('#dialogPreview');
  let activeProduct = 'signature';
  let dialogLayer = 'top';

  function openProduct(productId) {
    const product = products[productId];
    if (!product || !productDialog) return;
    activeProduct = productId;
    dialogTitle.textContent = product.name;
    dialogDescription.textContent = `${product.description} ${product.note}`;
    dialogImage.src = product.image;
    dialogImage.alt = `${product.name} — collection preview`;
    dialogLayer = 'top';
    $$('[data-dialog-style]').forEach(button => {
      const active = button.dataset.dialogStyle === dialogLayer;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (typeof productDialog.showModal === 'function') {
      productDialog.showModal();
      document.body.classList.add('dialog-open');
    } else {
      productDialog.setAttribute('open', '');
      document.body.classList.add('dialog-open');
    }
  }
  function closeProduct() {
    if (!productDialog) return;
    if (typeof productDialog.close === 'function' && productDialog.open) productDialog.close();
    else productDialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
  }
  $$('[data-open-product]').forEach(button => button.addEventListener('click', () => openProduct(button.dataset.openProduct)));
  dialogClose?.addEventListener('click', closeProduct);
  productDialog?.addEventListener('click', event => {
    if (event.target === productDialog) closeProduct();
  });
  productDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  $$('[data-dialog-style]').forEach(button => button.addEventListener('click', () => {
    dialogLayer = button.dataset.dialogStyle;
    $$('[data-dialog-style]').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }));

  // Manual, browser-local try-on illustration studio. No photo file is posted to a server.
  const canvas = $('#tryCanvas');
  const ctx = canvas?.getContext('2d');
  const photoUpload = $('#photoUpload');
  const canvasBadge = $('#canvasBadge');
  const canvasHint = $('#canvasHint');
  const studioStatus = $('#studioStatus');
  const layerScale = $('#layerScale');
  const layerRotate = $('#layerRotate');
  const scaleOutput = $('#scaleOutput');
  const rotateOutput = $('#rotateOutput');
  const downloadPreview = $('#downloadPreview');
  const colorButtons = $$('.swatch');
  const layerButtons = $$('[data-layer]');
  const previewModeButtons = $$('[data-preview-mode]');
  const manualModeControls = $('#manualModeControls');
  const referenceImageCache = new Map();

  const studioState = {
    photo: null,
    photoUrl: null,
    activeLayer: 'top',
    mode: 'set',
    color: '#252123',
    items: {
      top: { x: 360, y: 383, baseW: 238, baseH: 148, scale: 100, angle: 0 },
      bottom: { x: 360, y: 557, baseW: 190, baseH: 135, scale: 100, angle: 0 }
    },
    dragging: false,
    dragStart: null,
    selectedProduct: 'signature',
    previewMode: 'reference'
  };
  const canvasW = canvas?.width || 720;
  const canvasH = canvas?.height || 960;

  function setStudioStatus(message) {
    if (studioStatus) studioStatus.textContent = message;
  }
  function layerVisible(key) {
    return studioState.mode === 'set' || studioState.mode === key;
  }
  function currentItem() {
    return studioState.items[studioState.activeLayer];
  }
  function itemSize(item) {
    return { w: item.baseW * item.scale / 100, h: item.baseH * item.scale / 100 };
  }


  function drawSelectedReference() {
    const product = products[studioState.selectedProduct] || products.signature;
    const displayImage = product.previewImage || product.image;
    ctx.fillStyle = '#eee1da';
    ctx.fillRect(0, 0, canvasW, canvasH);
    let image = referenceImageCache.get(displayImage);
    if (!image) {
      image = new Image();
      referenceImageCache.set(displayImage, image);
      image.onload = () => {
        const current = products[studioState.selectedProduct] || products.signature;
        if (studioState.previewMode === 'reference' && (current.previewImage || current.image) === displayImage) drawScene();
      };
      image.onerror = () => {
        ctx.fillStyle = '#49363b';
        ctx.font = '600 20px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Reference image could not load', canvasW / 2, canvasH / 2);
      };
      image.src = displayImage;
    }
    if (image.complete && image.naturalWidth) {
      const padX = 22, padTop = 18, padBottom = 92;
      const scale = Math.min((canvasW - padX * 2) / image.naturalWidth, (canvasH - padTop - padBottom) / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (canvasW - width) / 2;
      const y = padTop + ((canvasH - padTop - padBottom) - height) / 2;
      ctx.drawImage(image, x, y, width, height);
    } else {
      ctx.fillStyle = '#89737a';
      ctx.font = '500 20px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Loading selected reference photo…', canvasW / 2, canvasH / 2);
    }
    const panelY = canvasH - 85;
    ctx.fillStyle = 'rgba(33, 25, 28, .88)';
    ctx.fillRect(0, panelY, canvasW, 85);
    ctx.fillStyle = '#f9e9ed';
    ctx.textAlign = 'center';
    ctx.font = '700 20px Arial, sans-serif';
    const title = product.name.length > 36 ? product.name.slice(0, 33) + '…' : product.name;
    ctx.fillText(title, canvasW / 2, panelY + 31);
    ctx.fillStyle = '#e8d2d7';
    ctx.font = '12px Arial, sans-serif';
    const note = product.previewNote || 'SELECTED ORIGINAL REFERENCE · NOT A BODY-FIT SIMULATION';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText(note.length > 62 ? note.slice(0, 59) + '…' : note, canvasW / 2, panelY + 55);
  }

  function drawPhoto() {
    const photo = studioState.photo;
    if (!photo) {
      // Never show a demo mannequin as if it were the selected garment.
      drawSelectedReference();
      return;
    }
    ctx.fillStyle = '#ded0c8';
    ctx.fillRect(0, 0, canvasW, canvasH);
    const ratio = Math.min(canvasW / photo.naturalWidth, canvasH / photo.naturalHeight);
    const width = photo.naturalWidth * ratio;
    const height = photo.naturalHeight * ratio;
    const x = (canvasW - width) / 2;
    const y = (canvasH - height) / 2;
    ctx.drawImage(photo, x, y, width, height);
    // Soft edge treatment so the image always fits the studio frame.
    ctx.strokeStyle = 'rgba(42,25,29,.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvasW - 2, canvasH - 2);
  }

  function drawTop(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.fillStyle = studioState.color;
    ctx.strokeStyle = 'rgba(255,246,247,.65)';
    ctx.lineWidth = Math.max(1.6, w * .008);
    // Simple stylised bralette silhouette — deliberately illustrative, not a real garment model.
    ctx.beginPath();
    ctx.moveTo(-w * .48, h * .02);
    ctx.bezierCurveTo(-w * .52, -h * .22, -w * .42, -h * .53, -w * .22, -h * .48);
    ctx.bezierCurveTo(-w * .09, -h * .46, -w * .035, -h * .12, 0, h * .03);
    ctx.bezierCurveTo(w * .035, -h * .12, w * .09, -h * .46, w * .22, -h * .48);
    ctx.bezierCurveTo(w * .42, -h * .53, w * .52, -h * .22, w * .48, h * .02);
    ctx.lineTo(w * .40, h * .24);
    ctx.quadraticCurveTo(0, h * .43, -w * .40, h * .24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Cup seam
    ctx.beginPath();
    ctx.moveTo(0, h * .02); ctx.quadraticCurveTo(-w * .20, h * .03, -w * .29, -h * .11);
    ctx.moveTo(0, h * .02); ctx.quadraticCurveTo(w * .20, h * .03, w * .29, -h * .11);
    ctx.stroke();
    // Band
    ctx.beginPath();
    ctx.moveTo(-w * .4, h * .22); ctx.quadraticCurveTo(0, h * .39, w * .4, h * .22);
    ctx.lineWidth = Math.max(3, w * .032); ctx.stroke();
    // Straps
    ctx.beginPath();
    ctx.moveTo(-w * .3, -h * .22); ctx.quadraticCurveTo(-w * .28, -h * .72, -w * .14, -h * .78);
    ctx.moveTo(w * .3, -h * .22); ctx.quadraticCurveTo(w * .28, -h * .72, w * .14, -h * .78);
    ctx.lineWidth = Math.max(3, w * .027); ctx.stroke();
    // Small centre accent
    ctx.fillStyle = '#f4c5d2';
    ctx.beginPath(); ctx.arc(0, h * .07, Math.max(3, w * .018), 0, Math.PI * 2); ctx.fill();
    drawLaceDetails(w, h);
    ctx.restore();
  }

  function drawBottom(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.fillStyle = studioState.color;
    ctx.strokeStyle = 'rgba(255,246,247,.66)';
    ctx.lineWidth = Math.max(1.6, w * .008);
    ctx.beginPath();
    ctx.moveTo(-w * .48, -h * .35);
    ctx.quadraticCurveTo(-w * .24, -h * .22, 0, -h * .30);
    ctx.quadraticCurveTo(w * .24, -h * .22, w * .48, -h * .35);
    ctx.lineTo(w * .39, -h * .02);
    ctx.lineTo(w * .23, h * .47);
    ctx.quadraticCurveTo(0, h * .39, -w * .23, h * .47);
    ctx.lineTo(-w * .39, -h * .02);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-w * .48, -h * .35); ctx.quadraticCurveTo(0, -h * .2, w * .48, -h * .35);
    ctx.lineWidth = Math.max(3, w * .035); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -h * .25); ctx.quadraticCurveTo(-w * .04, h * .05, 0, h * .28);
    ctx.strokeStyle = 'rgba(255,246,247,.5)'; ctx.lineWidth = Math.max(1.5, w * .01); ctx.stroke();
    drawLaceDetails(w, h);
    ctx.restore();
  }

  function drawLaceDetails(w, h) {
    // Subtle repeat dots make the illustration read as fabric without pretending to be photo-realistic.
    ctx.save();
    ctx.fillStyle = 'rgba(255,235,241,.28)';
    const step = Math.max(10, w * .065);
    for (let row = 0; row < 3; row += 1) {
      for (let col = -3; col <= 3; col += 1) {
        ctx.beginPath();
        ctx.arc(col * step, -h * .1 + row * step, Math.max(1.2, w * .006), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawSelection(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.strokeStyle = 'rgba(255,255,255,.9)';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 6]);
    ctx.strokeRect(-w * .58, -h * .85, w * 1.16, h * 1.7);
    ctx.setLineDash([]);
    ctx.fillStyle = '#fffaf7';
    ctx.strokeStyle = '#8f435b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(w * .58, -h * .85, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawScene(showSelection = true) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);
    if (studioState.previewMode === 'reference' || !studioState.photo) {
      // Product/reference photo always wins unless a customer has uploaded a photo
      // and explicitly switched to the optional manual guide mode.
      drawSelectedReference();
      return;
    }
    drawPhoto();
    if (layerVisible('top')) drawTop(studioState.items.top);
    if (layerVisible('bottom')) drawBottom(studioState.items.bottom);
    if (showSelection) {
      const item = currentItem();
      if (item && layerVisible(studioState.activeLayer)) drawSelection(item);
    }
  }

  function updatePreviewModeUI() {
    const isReference = studioState.previewMode === 'reference';
    const manualButton = $('[data-preview-mode="manual"]');
    if (manualButton) {
      manualButton.disabled = !studioState.photo;
      manualButton.title = studioState.photo ? 'Show your local photo with a generic manual illustration overlay' : 'Choose your own photo first; the selected product photo stays visible by default';
    }
    previewModeButtons.forEach(button => {
      const selected = button.dataset.previewMode === studioState.previewMode;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (manualModeControls) manualModeControls.hidden = isReference;
    if (canvasBadge) canvasBadge.textContent = isReference ? 'SELECTED PRODUCT / REFERENCE PHOTO' : (studioState.photo ? 'YOUR PHOTO · LOCAL' : 'ILLUSTRATION GUIDE');
    if (canvasHint) canvasHint.textContent = isReference
      ? 'This canvas shows the selected item: garment-detail concept image when available, otherwise its exact original supplied photo. It does not simulate body fit.'
      : (studioState.photo
        ? 'Your photo is local to this browser. Drag the generic illustration to explore placement; the selected reference remains above for comparison.'
        : 'This generic illustration is only a positioning guide. Select a product photo to return to the real selected image.');
    const shell = $('#canvasShell');
    if (shell) shell.classList.toggle('is-reference-mode', isReference);
    drawScene();
  }

  previewModeButtons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.previewMode === 'manual' && !studioState.photo) {
      setStudioStatus('Choose your own photo first. The selected product photo stays in the main preview until you explicitly switch modes.');
      return;
    }
    studioState.previewMode = button.dataset.previewMode === 'manual' ? 'manual' : 'reference';
    updatePreviewModeUI();
    setStudioStatus(studioState.previewMode === 'reference'
      ? 'Selected product/reference photo is now shown in the canvas.'
      : 'Illustration guide is active. It is a generic guide, not the selected garment; tap Selected Product Photo to return to the selected image.');
  }));

  function updateLayerControls() {
    const item = currentItem();
    if (layerScale) layerScale.value = String(item.scale);
    if (layerRotate) layerRotate.value = String(item.angle);
    if (scaleOutput) scaleOutput.value = `${item.scale}%`;
    if (rotateOutput) rotateOutput.value = `${item.angle}°`;
    layerButtons.forEach(button => {
      const active = button.dataset.layer === studioState.mode;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function setLayer(layer) {
    if (layer === 'set') {
      studioState.mode = 'set';
      studioState.activeLayer = 'top';
    } else {
      studioState.mode = layer;
      studioState.activeLayer = layer;
    }
    updateLayerControls();
    drawScene();
    setStudioStatus(layer === 'set' ? 'Set view selected. Tap or drag either garment layer to reposition it.' : `${layer === 'top' ? 'Top' : 'Bottom'} layer selected. Drag it on the canvas or use the controls below.`);
  }
  layerButtons.forEach(button => button.addEventListener('click', () => setLayer(button.dataset.layer)));

  colorButtons.forEach(button => button.addEventListener('click', () => {
    studioState.color = button.dataset.colour;
    colorButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    drawScene();
    setStudioStatus('Colour updated for the illustration. This is a manual visual mockup only.');
  }));

  layerScale?.addEventListener('input', () => {
    currentItem().scale = Number(layerScale.value);
    updateLayerControls();
    drawScene();
  });
  layerRotate?.addEventListener('input', () => {
    currentItem().angle = Number(layerRotate.value);
    updateLayerControls();
    drawScene();
  });

  function resetPlacement() {
    studioState.items.top = { x: 360, y: 383, baseW: 238, baseH: 148, scale: 100, angle: 0 };
    studioState.items.bottom = { x: 360, y: 557, baseW: 190, baseH: 135, scale: 100, angle: 0 };
    studioState.activeLayer = 'top';
    studioState.mode = 'set';
    updateLayerControls();
    drawScene();
    setStudioStatus('Placement reset. Drag layers to suit your photo; the tool does not detect body proportions.');
  }
  $('#resetLayer')?.addEventListener('click', resetPlacement);

  function loadPhoto(file) {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setStudioStatus('Please choose a JPG, PNG or WEBP image.');
      if (photoUpload) photoUpload.value = '';
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setStudioStatus('That image is larger than 12 MB. Choose a smaller image to keep the preview fast.');
      if (photoUpload) photoUpload.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (studioState.photoUrl) URL.revokeObjectURL(studioState.photoUrl);
      studioState.photo = image;
      studioState.photoUrl = url;
      // Keep the actual selected product/reference as the main preview after upload.
      // The customer must tap the separate guide button to see a generic overlay.
      studioState.previewMode = 'reference';
      updatePreviewModeUI();
      setStudioStatus('Your photo is ready in this browser. The selected product photo remains the main preview. Tap “My photo + guide” only if you want a generic illustration over your photo.');
      if (photoUpload) photoUpload.value = '';
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setStudioStatus('That image could not be opened. Try a different JPG, PNG or WEBP file.');
      if (photoUpload) photoUpload.value = '';
    };
    image.src = url;
  }
  photoUpload?.addEventListener('change', event => loadPhoto(event.target.files?.[0]));
  $('#clearPhoto')?.addEventListener('click', () => {
    if (studioState.photoUrl) URL.revokeObjectURL(studioState.photoUrl);
    studioState.photo = null;
    studioState.photoUrl = null;
    if (photoUpload) photoUpload.value = '';
    studioState.previewMode = 'reference';
    updatePreviewModeUI();
    setStudioStatus('Your uploaded photo was cleared from the preview. The selected original reference photo is shown again.');
  });

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvasW / rect.width, y: (event.clientY - rect.top) * canvasH / rect.height };
  }
  function hitTest(point, key) {
    const item = studioState.items[key];
    const { w, h } = itemSize(item);
    const angle = -item.angle * Math.PI / 180;
    const dx = point.x - item.x;
    const dy = point.y - item.y;
    const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
    const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
    return Math.abs(localX) <= w * .6 && Math.abs(localY) <= h * .9;
  }
  if (canvas) {
    canvas.addEventListener('pointerdown', event => {
      if (!ctx || studioState.previewMode !== 'manual') return;
      const point = canvasPoint(event);
      let selected = studioState.activeLayer;
      if (studioState.mode === 'set') {
        if (hitTest(point, 'bottom')) selected = 'bottom';
        else if (hitTest(point, 'top')) selected = 'top';
      } else {
        selected = studioState.mode;
      }
      studioState.activeLayer = selected;
      studioState.dragging = true;
      studioState.dragStart = { pointer: point, x: studioState.items[selected].x, y: studioState.items[selected].y };
      canvas.setPointerCapture?.(event.pointerId);
      updateLayerControls();
      drawScene();
      setStudioStatus(`Moving ${selected} layer. Release to finish positioning.`);
      event.preventDefault();
    });
    canvas.addEventListener('pointermove', event => {
      if (!studioState.dragging || !studioState.dragStart) return;
      const point = canvasPoint(event);
      const dx = point.x - studioState.dragStart.pointer.x;
      const dy = point.y - studioState.dragStart.pointer.y;
      const item = currentItem();
      item.x = Math.max(25, Math.min(canvasW - 25, studioState.dragStart.x + dx));
      item.y = Math.max(25, Math.min(canvasH - 25, studioState.dragStart.y + dy));
      drawScene();
    });
    const endDrag = () => {
      if (studioState.dragging) setStudioStatus('Placement updated. This is a visual mockup, not a fit prediction.');
      studioState.dragging = false;
      studioState.dragStart = null;
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('keydown', event => {
      if (studioState.previewMode !== 'manual') return;
      const move = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[event.key];
      if (!move) return;
      const item = currentItem();
      item.x = Math.max(25, Math.min(canvasW - 25, item.x + move[0]));
      item.y = Math.max(25, Math.min(canvasH - 25, item.y + move[1]));
      drawScene();
      setStudioStatus('Placement moved with keyboard.');
      event.preventDefault();
    });
  }

  downloadPreview?.addEventListener('click', () => {
    if (!canvas) return;
    try {
      drawScene(false);
      const saveCanvas = document.createElement('canvas');
      saveCanvas.width = canvasW;
      saveCanvas.height = canvasH;
      const saveCtx = saveCanvas.getContext('2d');
      saveCtx.drawImage(canvas, 0, 0);
      drawScene(true);
      saveCanvas.toBlob(blob => {
        if (!blob) {
          setStudioStatus('Could not create the image. Try again or choose a different photo.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'blacked-manual-preview.png';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1200);
        setStudioStatus('Preview saved to your device. The image was generated in your browser.');
        toast('Your manual preview is ready to save.');
      }, 'image/png');
    } catch (error) {
      drawScene(true);
      setStudioStatus('Preview could not be saved. Try a smaller personal photo or switch back to the selected reference photo.');
    }
  });

  // The ten original references are selectable inside Try-On Studio itself.
  const studioProductGrid = $('#studioProductGrid');
  const studioSelectedImage = $('#studioSelectedImage');
  const studioSelectedCategory = $('#studioSelectedCategory');
  const studioSelectedName = $('#studioSelectedName');
  const studioSelectedDescription = $('#studioSelectedDescription');
  const studioSelectedDetailImage = $('#studioSelectedDetailImage');
  const studioProductCount = $('#studioProductCount');

  function syncStudioProductPicker() {
    const productId = studioState.selectedProduct || activeProduct || 'signature';
    const product = products[productId];
    if (!product) return;
    if (studioSelectedImage) { studioSelectedImage.src = product.image; studioSelectedImage.alt = `${product.name} — supplied reference image`; }
    if (studioSelectedDetailImage) {
      if (product.previewImage && product.previewImage !== product.image) {
        studioSelectedDetailImage.src = product.previewImage;
        studioSelectedDetailImage.alt = `${product.name} — separate garment-detail concept view`;
        studioSelectedDetailImage.hidden = false;
      } else {
        studioSelectedDetailImage.removeAttribute('src');
        studioSelectedDetailImage.hidden = true;
      }
    }
    if (studioSelectedCategory) studioSelectedCategory.textContent = product.category;
    if (studioSelectedName) studioSelectedName.textContent = product.name;
    if (studioSelectedDescription) studioSelectedDescription.textContent = product.description;
    if (studioProductCount) studioProductCount.textContent = `${Object.keys(products).length} options`;
    $$('[data-studio-product]', studioProductGrid || document).forEach(button => {
      const selected = button.dataset.studioProduct === productId;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function renderStudioProductPicker() {
    if (!studioProductGrid) return;
    let lastGroup = '';
    const entries = Object.entries(products);
    studioProductGrid.innerHTML = entries.map(([id, product], index) => {
      const isExternal = id.startsWith('syrn-');
      const isConcept = ['sculpt', 'midnight', 'scarlet', 'ivory'].includes(id);
      const group = isExternal ? 'SYRN STYLE INSPIRATION · EXTERNAL BRAND' : isConcept ? 'ADDED BLACKED DESIGN CONCEPTS' : 'YOUR 10 ORIGINAL REFERENCES';
      const divider = group !== lastGroup ? `<div class="studio-picker-group-label">${group}</div>` : '';
      lastGroup = group;
      const thumb = product.previewImage || product.image;
      return `${divider}<button type="button" class="studio-product-option" data-studio-product="${id}" aria-pressed="${id === (studioState.selectedProduct || 'signature') ? 'true' : 'false'}">
        <img src="${thumb}" alt="" loading="lazy"><span class="studio-product-number">${String(index + 1).padStart(2, '0')}</span><span class="studio-product-name">${product.name}</span><span class="studio-product-type">${(productMeta[id]?.source || 'Original reference')}</span>
      </button>`;
    }).join('');
    $$('[data-studio-product]', studioProductGrid).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.studioProduct, 'set')));
    syncStudioProductPicker();
  }

  // Product actions launch the manual studio, with no AI inference.
  function goToStudio(productId, layer = 'set') {
    activeProduct = productId || activeProduct;
    studioState.selectedProduct = activeProduct;
    studioState.previewMode = 'reference';
    const product = products[activeProduct];
    const suggestedColors = {
      redlace: '#b84f70', blacklace: '#252123', velvet: '#6e4259', rose: '#b84f70', sculpt: '#252123', midnight: '#252123', scarlet: '#70253a', ivory: '#d8c5ad', 'syrn-demi': '#c7978d', 'syrn-balconette': '#242026', 'syrn-bodysuit': '#7d384f',
      butterfly: '#b84f70', move: '#252123', yoga: '#252123', stretch: '#252123',
      signature: '#252123', together: '#252123'
    };
    studioState.color = suggestedColors[activeProduct] || '#252123';
    updatePreviewModeUI();
    syncStudioProductPicker();
    colorButtons.forEach(button => {
      const active = button.dataset.colour === studioState.color;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    setLayer(layer);
    $('#studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    drawScene();
    toast('Selected reference photo updated in the Try-On Studio.');
  }
  renderStudioProductPicker();
  $$('[data-preview-product]').forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.previewProduct, 'set')));
  dialogPreview?.addEventListener('click', () => {
    closeProduct();
    goToStudio(activeProduct, dialogLayer);
  });

  // Preference-based Style Quiz: deterministic rules only; no AI or external request.
  const styleQuizForm = $('#styleQuizForm');
  const styleQuizResults = $('#styleQuizResults');
  const quizProductIds = Object.keys(products).filter(id => !id.startsWith('syrn-')); // keep external references separate from BLACKED recommendations
  styleQuizForm?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(styleQuizForm);
    const style = String(data.get('quizStyle') || 'everyday');
    const coverage = String(data.get('quizCoverage') || 'balanced');
    const color = String(data.get('quizColor') || 'any');
    const ranked = quizProductIds.map((id, index) => {
      const product = products[id];
      const meta = productMeta[id] || {};
      let score = 0;
      if ((meta.styles || []).includes(style)) score += 5;
      if (style === 'everyday' && ['move', 'stretch', 'signature', 'together'].includes(id)) score += 1;
      if (style === 'lace' && ['redlace', 'blacklace', 'velvet', 'butterfly'].includes(id)) score += 1;
      if (style === 'statement' && ['redlace', 'blacklace', 'velvet', 'rose', 'butterfly'].includes(id)) score += 1;
      if (style === 'movement' && ['move', 'yoga', 'stretch'].includes(id)) score += 1;
      if (coverage === 'more' && ['signature', 'move', 'stretch', 'together'].includes(id)) score += 2;
      if (coverage === 'minimal' && ['rose', 'butterfly', 'redlace', 'blacklace', 'velvet'].includes(id)) score += 2;
      if (coverage === 'balanced' && ['move', 'yoga', 'stretch', 'signature', 'together'].includes(id)) score += 1;
      if (color !== 'any' && (meta.colors || []).includes(color)) score += 3;
      return { id, product, meta, score, index };
    }).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3);
    if (!styleQuizResults) return;
    styleQuizResults.innerHTML = `<div class="quiz-results-heading"><span class="selected-look-kicker">YOUR STYLE EDIT</span><h3>Three references to explore.</h3><p>Matched to your preferences, not a claim about garment fit or stock.</p></div><div class="quiz-result-grid">${ranked.map(({id, product, meta}) => `<article class="quiz-result-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><div class="quiz-result-actions"><button type="button" class="button button-dark button-small" data-quiz-try="${id}">View in try-on</button><button type="button" class="save-style-button" data-quiz-save="${id}">♡ Save</button></div></div></article>`).join('')}</div>`;
    $$('[data-quiz-try]', styleQuizResults).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.quizTry, 'set')));
    $$('[data-quiz-save]', styleQuizResults).forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.quizSave)));
    toast('Your style edit is ready.');
  });


  // Build a local style moodboard from two of the user's original image references.
  const boardPrimary = $('#boardPrimary');
  const boardAccent = $('#boardAccent');
  const boardPreview = $('#styleBoardPreview');
  const downloadStyleBoard = $('#downloadStyleBoard');
  const boardSelectIds = [boardPrimary, boardAccent];
  function fillBoardSelect(select, defaultId) {
    if (!select) return;
    select.innerHTML = Object.entries(products).map(([id, product]) => `<option value="${id}">${product.name}</option>`).join('');
    select.value = products[defaultId] ? defaultId : Object.keys(products)[0];
  }
  fillBoardSelect(boardPrimary, 'signature');
  fillBoardSelect(boardAccent, 'velvet');
  function renderStyleBoard() {
    if (!boardPrimary || !boardAccent) return;
    const mainId = boardPrimary.value;
    const accentId = boardAccent.value;
    const main = products[mainId];
    const accent = products[accentId];
    if (!main || !accent) return;
    $('#boardPrimaryImage').src = main.image;
    $('#boardPrimaryImage').alt = `${main.name} original reference`;
    $('#boardPrimaryName').textContent = main.name;
    $('#boardPrimaryKicker').textContent = productMeta[mainId]?.source || 'Main look';
    $('#boardAccentImage').src = accent.image;
    $('#boardAccentImage').alt = `${accent.name} original reference`;
    $('#boardAccentName').textContent = accent.name;
    $('#boardAccentKicker').textContent = productMeta[accentId]?.source || 'Pairing idea';
    if (boardPreview) boardPreview.hidden = false;
    if (downloadStyleBoard) downloadStyleBoard.disabled = false;
  }
  $('#buildStyleBoard')?.addEventListener('click', () => { renderStyleBoard(); toast('Your style moodboard is ready.'); });
  boardSelectIds.forEach(select => select?.addEventListener('change', () => { if (boardPreview && !boardPreview.hidden) renderStyleBoard(); }));
  downloadStyleBoard?.addEventListener('click', async () => {
    if (!boardPrimary || !boardAccent) return;
    const chosen = [products[boardPrimary.value], products[boardAccent.value]];
    if (chosen.some(item => !item)) return;
    try {
      const images = await Promise.all(chosen.map(product => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Could not load a reference image.'));
        img.src = product.image;
      })));
      const out = document.createElement('canvas');
      out.width = 1200; out.height = 720;
      const c = out.getContext('2d');
      c.fillStyle = '#f7eee8'; c.fillRect(0, 0, out.width, out.height);
      c.fillStyle = '#261e21'; c.font = '700 26px Arial, sans-serif'; c.fillText('BLACKED INNERWEAR · STYLE MOODBOARD', 54, 56);
      c.fillStyle = '#966075'; c.font = '15px Arial, sans-serif'; c.fillText('Original reference pairing · inspiration only, not confirmed stock', 54, 84);
      const cardX = [54, 620];
      images.forEach((img, i) => {
        const x = cardX[i], y = 112, w = 526, h = 500;
        c.fillStyle = '#fffaf7'; c.fillRect(x, y, w, h);
        c.fillStyle = '#ecded7'; c.fillRect(x + 15, y + 15, w - 30, 390);
        const ratio = Math.min((w - 42) / img.naturalWidth, 360 / img.naturalHeight);
        const dw = img.naturalWidth * ratio, dh = img.naturalHeight * ratio;
        c.drawImage(img, x + (w - dw) / 2, y + 28 + (360 - dh) / 2, dw, dh);
        c.fillStyle = '#9d5b70'; c.font = '700 12px Arial, sans-serif'; c.fillText(i === 0 ? 'MAIN LOOK' : 'PAIRING IDEA', x + 19, y + 432);
        c.fillStyle = '#281f22'; c.font = '600 20px Arial, sans-serif';
        const name = chosen[i].name.length > 42 ? chosen[i].name.slice(0, 39) + '…' : chosen[i].name;
        c.fillText(name, x + 19, y + 463);
      });
      c.fillStyle = '#745e64'; c.font = '13px Arial, sans-serif'; c.fillText('For design exploration only · BLACKED product specs and stock are not confirmed', 54, 665);
      const blob = await new Promise(resolve => out.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Could not create PNG.');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'blacked-style-moodboard.png'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast('Moodboard saved to your device.');
    } catch (_) {
      toast('Moodboard could not be saved. Check that the local images are present.');
    }
  });

  // Measurement finder: demo clothing chart only; not a bra band/cup calculator.
  let unit = 'in';
  const measurementIds = ['bust', 'underbust', 'waist', 'hips'];
  const unitButtons = $$('.unit-button');
  const fitForm = $('#fitForm');
  const fitError = $('#fitError');
  const fitResult = $('#fitResult');
  const fitRanges = [
    { size: 'XS', bust: [28, 30], waist: [22, 24], hips: [30, 32] },
    { size: 'S', bust: [30, 32], waist: [24, 26], hips: [32, 34] },
    { size: 'M', bust: [32, 34], waist: [26, 28], hips: [34, 36] },
    { size: 'L', bust: [34, 36], waist: [28, 30], hips: [36, 38] },
    { size: 'XL', bust: [36, 38], waist: [30, 32], hips: [38, 40] },
    { size: 'XXL', bust: [38, 40], waist: [32, 34], hips: [40, 42] }
  ];

  const fitPassportKey = 'blacked-fit-passport-v040';
  const saveFitPassportToggle = $('#saveFitPassport');
  const fitPassportStatus = $('#fitPassportStatus');

  function setPassportStatus(message) {
    if (fitPassportStatus) fitPassportStatus.textContent = message;
  }
  function restoreFitPassport() {
    try {
      const profile = JSON.parse(localStorage.getItem(fitPassportKey) || 'null');
      if (!profile || !profile.values) return;
      measurementIds.forEach(id => {
        if (Number.isFinite(Number(profile.values[id]))) $(`#${id}`).value = String(profile.values[id]);
      });
      if (saveFitPassportToggle) saveFitPassportToggle.checked = true;
      setPassportStatus('Saved Fit Passport loaded from this device. It has not been sent to a server.');
    } catch (_) {
      setPassportStatus('This browser does not allow local storage right now. The size finder still works without saving.');
    }
  }
  function clearFitPassport(clearInputs = true) {
    try { localStorage.removeItem(fitPassportKey); } catch (_) {}
    if (saveFitPassportToggle) saveFitPassportToggle.checked = false;
    if (clearInputs) measurementIds.forEach(id => { const input = $(`#${id}`); if (input) input.value = ''; });
    if (fitResult) fitResult.hidden = true;
    if (fitError) fitError.hidden = true;
    setPassportStatus('Saved Fit Passport cleared from this device.');
  }
  saveFitPassportToggle?.addEventListener('change', () => {
    if (!saveFitPassportToggle.checked) {
      try { localStorage.removeItem(fitPassportKey); } catch (_) {}
      setPassportStatus('Saved Fit Passport removed. Measurements will not be saved.');
    } else {
      setPassportStatus('Your measurements will be saved on this device after your next size check.');
    }
  });
  $('#clearFitPassport')?.addEventListener('click', () => clearFitPassport(true));

  function getMeasurementInches(id) {
    const raw = Number($(`#${id}`).value);
    return unit === 'cm' ? raw / 2.54 : raw;
  }
  function findSize(value, key) {
    const first = fitRanges[0][key][0];
    const last = fitRanges[fitRanges.length - 1][key][1];
    if (value < first) return { size: 'Below XS', outside: true };
    if (value > last) return { size: 'Above XXL', outside: true };
    for (let index = 0; index < fitRanges.length; index += 1) {
      const range = fitRanges[index][key];
      const isLast = index === fitRanges.length - 1;
      if (value >= range[0] && (value < range[1] || (isLast && value <= range[1]))) {
        return { size: fitRanges[index].size, outside: false };
      }
    }
    return { size: 'Check chart', outside: true };
  }

  unitButtons.forEach(button => button.addEventListener('click', () => {
    const nextUnit = button.dataset.unit;
    if (nextUnit === unit) return;
    measurementIds.forEach(id => {
      const input = $(`#${id}`);
      if (input.value.trim()) {
        const converted = nextUnit === 'cm' ? Number(input.value) * 2.54 : Number(input.value) / 2.54;
        input.value = String(Math.round(converted * 10) / 10);
      }
    });
    unit = nextUnit;
    unitButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    $$('.unit-label').forEach(label => { label.textContent = unit; });
    const ranges = unit === 'cm' ? { bust: [50, 165], underbust: [50, 165], waist: [45, 165], hips: [50, 190] } : { bust: [20, 65], underbust: [20, 65], waist: [18, 65], hips: [20, 75] };
    measurementIds.forEach(id => {
      const input = $(`#${id}`);
      input.min = ranges[id][0]; input.max = ranges[id][1];
      input.placeholder = id === 'bust' ? (unit === 'cm' ? 'e.g. 86' : 'e.g. 34')
        : id === 'underbust' ? (unit === 'cm' ? 'e.g. 76' : 'e.g. 30')
        : id === 'waist' ? (unit === 'cm' ? 'e.g. 71' : 'e.g. 28')
        : (unit === 'cm' ? 'e.g. 91' : 'e.g. 36');
    });
    if (fitError) fitError.hidden = true;
    if (fitResult) fitResult.hidden = true;
  }));

  measurementIds.forEach(id => {
    $(`#${id}`)?.addEventListener('input', () => {
      if (fitError) fitError.hidden = true;
      if (fitResult) fitResult.hidden = true;
    });
  });

  fitForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (fitError) fitError.hidden = true;
    if (fitResult) fitResult.hidden = true;
    const values = {};
    for (const id of measurementIds) {
      const input = $(`#${id}`);
      const value = Number(input.value);
      if (!input.value.trim() || !Number.isFinite(value) || value < Number(input.min) || value > Number(input.max)) {
        if (fitError) {
          fitError.textContent = `Please enter a valid ${id} measurement in ${unit === 'in' ? 'inches' : 'centimetres'}.`;
          fitError.hidden = false;
        }
        input.focus();
        return;
      }
      values[id] = getMeasurementInches(id);
    }
    if (values.bust <= values.underbust) {
      if (fitError) {
        fitError.textContent = 'Bust is usually measured around the fullest part, so it should be greater than underbust. Please check those two values.';
        fitError.hidden = false;
      }
      $('#bust').focus();
      return;
    }
    const top = findSize(values.bust, 'bust');
    const bottom = findSize(values.hips, 'hips');
    const waist = findSize(values.waist, 'waist');
    $('#topSizeResult').textContent = top.size;
    $('#bottomSizeResult').textContent = bottom.size;
    const notes = [];
    if (top.outside || bottom.outside || waist.outside) notes.push('One or more measurements fall outside the sample chart; do not force a size choice.');
    else if (waist.size !== bottom.size) notes.push(`Your waist maps to ${waist.size} in the sample chart while hips map to ${bottom.size}. Compare the actual garment measurements and fit notes before choosing.`);
    if (!top.outside && !bottom.outside && top.size !== bottom.size) notes.push('It is normal for top and bottom sizes to differ; use separate sizes if the final product allows it.');
    notes.push('This is a general apparel-size illustration, not bra band/cup sizing or a fit guarantee.');
    $('#resultNote').textContent = notes.join(' ');
    if (saveFitPassportToggle?.checked) {
      try {
        localStorage.setItem(fitPassportKey, JSON.stringify({ values, unit: 'in' }));
        setPassportStatus('Fit Passport saved on this device only. Use “Clear saved profile” to remove it.');
      } catch (_) {
        setPassportStatus('Could not save in this browser; the size finder still works for this session.');
      }
    }
    if (fitResult) fitResult.hidden = false;
    fitResult?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  $('#editMeasurements')?.addEventListener('click', () => {
    fitResult.hidden = true;
    $('#bust').focus();
  });

  // A consistent year display; no analytics, external scripts or tracking are used.
  $('#year').textContent = String(new Date().getFullYear());
  updateLayerControls();
  restoreFitPassport();
  updatePreviewModeUI();
  drawScene();
})();
