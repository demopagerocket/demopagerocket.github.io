self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v5').then(function (cache) {
      return cache.addAll([
       	'/','manifest.json','favicon-32x32.png','icon-144x144.png','img_1_1_400x400.webp','img_1_1_800x800.webp','img_6_1_1600x400.webp','img_1_15_400x600.webp','index.html','lead.html','gallery.html','article.html','forms.html','grid.html','components.html',
        // etc.
      ]);
    }),
  );
});
// Promise.race is no good to us because it rejects if
// a promise rejects before fulfilling. Let's make a proper
// race function:
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // make sure promises are all promises
    promises = promises.map((p) => Promise.resolve(p));
    // resolve this promise as soon as one resolves
    promises.forEach((p) => p.then(resolve));
    // reject if all promises reject
    promises.reduce((a, b) => a.catch(() => b)).catch(() => reject(Error('All failed')));
  });
}

self.addEventListener('fetch', function (event) {
  event.respondWith(promiseAny([caches.match(event.request), fetch(event.request)]));
});
