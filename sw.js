self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v10').then(function (cache) {
      return cache.addAll([
       	'/','manifest.json','favicon-32x32.png','icon-144x144.png','img_1_1_400x400.webp','img_1_1_800x800.webp','img_6_1_1600x400.webp','img_1_15_400x600.webp','index.html','lead.html','gallery.html','article.html','forms.html','grid.html','components.html'
      ]);
    }),
  );
});
addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    // Else, use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;

    // Else try the network.
    return fetch(event.request);
  }());
});
