/**
 * Implements the registration of the PWA service worker
 */

 // inspired from https://alligator.io/js/service-workers/

self.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    console.warning('PWA support: service worker not supported 😣. Skipping PWA...');
    return
  }

  navigator.serviceWorker.register('/pwa-serviceworker.js')
  .then(function(registration) {
    console.log('PWA support: Service worker successfully registered in scope 🏼:', registration.scope);
  })
  .catch(function(error) {
    console.error('PWA support: Service worker registration failed! 😱', error)
  });
})
