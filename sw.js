var CACHE_NAME = 'v1';
var urlsToCache = [
	'/','manifest.json','favicon-32x32.png','icon-144x144.png','img_1_1_400x400.webp','img_1_1_800x800.webp','img_6_1_1600x400.webp','img_1_15_400x600.webp','index.html','lead.html','gallery.html','article.html','forms.html','grid.html','components.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
