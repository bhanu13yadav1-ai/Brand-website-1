/* BLACKED Fusion V1 — Step 3 root-level static cache. Never cache a missing asset as a successful substitute. */
'use strict';
const CACHE_NAME = 'blacked-fusion-v1-step3-3';
const CORE = [
  './', './index.html', './styles.css?v=step3-3', './catalog.js?v=step3-3', './app.js?v=step3-3',
  './manifest.webmanifest', './assets/blacked-icon.svg',
  './assets/muslim-collection/muslim-shaam-e-noor.webp',
  './assets/muslim-collection/muslim-shaam-ki-roshni.webp',
  './assets/muslim-collection/muslim-noor-ka-nasha.webp',
  './assets/muslim-collection/muslim-shaam-se-raat-tak.webp',
  './assets/muslim-collection/muslim-tradition-outside-desire-inside.webp',
  './assets/muslim-collection/muslim-elegance-begins-within.webp',
  './assets/christian-collection/christian-grace-has-never-looked-so-bold.webp',
  './assets/sanskari-collection/sanskari-outside-dangerous-new.webp',
  './assets/sanskari-collection/sanskari-outside-bold-within.webp'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const failed = [];
    for (const path of CORE) {
      try {
        const response = await fetch(path, {cache:'reload'});
        if (!response.ok) { failed.push(`${path} (${response.status})`); continue; }
        await cache.put(path, response);
      } catch { failed.push(`${path} (network error)`); }
    }
    // Missing files remain visible as a failed-install diagnostic rather than being hidden.
    if (failed.length) console.warn('[BLACKED SW] Some optional shell resources failed to cache:', failed);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Remove stale cache generations used by the earlier BLACKED Fusion bundles.
    // Keep caches belonging to unrelated apps on the same origin untouched.
    const oldFusionNames = new Set(['blacked-fusion-v1-step3-2', 'blacked-fusion-v3.0', 'blacked-fusion-v3.1', 'blacked-fusion-v4.0', 'blacked-fusion-v4.1']);
    await Promise.all(keys.filter(key => (key.startsWith('blacked-fusion-v1-step') || oldFusionNames.has(key)) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // remote GitHub images are not falsely treated as local/offline assets.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const live = await fetch(event.request);
        if (live.ok) (await caches.open(CACHE_NAME)).put('./index.html', live.clone()).catch(()=>{});
        return live;
      } catch {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    // Search only this release cache. Global caches.match() can return an older
    // styles.css/app.js response from another BLACKED cache before cleanup completes.
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try {
      const live = await fetch(event.request);
      if (live.ok) cache.put(event.request, live.clone()).catch(()=>{});
      return live;
    } catch { return Response.error(); }
  })());
});
