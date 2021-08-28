addEventListener('install', event => {
  event.waitUntil(async function() {
    const cache = await caches.open('v1');
    await cache.add('/', 'index.html', 'prices.html', 'infotext.html', 'tabs.html', 'cardsgrid.html', 'contacts.html', 'downloads.html', 'img/favicon-32x32.png', 'img/apple-touch-icon.png', 'img/icon-72x72.png', 'img/icon-96x96.png', 'img/icon-128x128.png', 'img/icon-144x144.png', 'img/icon-152x152.png', 'img/icon-192x192.png', 'img/icon-384x384.png', 'img/icon-512x512.png', 'img/maskable_icon.png', 'manifest.json');
  }());
});

addEventListener('activate', event => {
  event.waitUntil(async function() {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;
    const response = await event.preloadResponse;
    if (response) return response;
    return fetch(event.request);
  }());
});
