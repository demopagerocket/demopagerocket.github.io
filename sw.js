addEventListener('install', event => {
  event.waitUntil(async function() {
    const cache = await caches.open('v1');
    await cache.add('index.html', 'prices.html', 'infotext.html', 'tabs.html', 'cardsgrid.html', 'contacts.html', 'downloads.html');
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
