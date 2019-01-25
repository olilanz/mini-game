/**
 * Implements the PWA service worker
 */

// inspired from https://alligator.io/js/service-workers/

self.addEventListener('install', event => {
  console.log('PWA install: initializing cache');
  event.waitUntil(
      caches.open('mini-game')
      // Not installing anything yet... might do later.
/*
        .then(cache =>
          cache.addAll([
            'favicon.ico',
            'main.css',
            'script.js'
          ])
        )
*/
  )
})

self.addEventListener('activate', function(event) {
  console.log('PWA activate:',  JSON.stringify(event));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('PWA fetch: Fetching from cache...');
        return response
      }
      console.log('PWA fetch:  Cache miss... fetching from server...');
      return fetch(event.request)
    })
  )
})

