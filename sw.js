const cacheName = 'dv_01'; const precacheResources = ['/', 'index.html', 'prices.html', 'infotext.html', 'tabs.html', 'cardsgrid.html', 'contacts.html', 'downloads.html', 'img/favicon-32x32.png', 'img/apple-touch-icon.png', 'img/icon-72x72.png', 'img/icon-96x96.png', 'img/icon-128x128.png', 'img/icon-144x144.png', 'img/icon-152x152.png', 'img/icon-192x192.png', 'img/icon-384x384.png', 'img/icon-512x512.png', 'img/maskable_icon.png', 'manifest.json']; self.addEventListener('install', (event) => { console.log('Service worker install event!'); event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources))); }); 

addEventListener('activate', event => {
  event.waitUntil(async function() {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    // Use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;
    
    // Else try the network.
    return fetch(event.request);
  }());
});
