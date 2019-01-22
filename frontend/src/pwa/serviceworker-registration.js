// inspired from https://alligator.io/js/service-workers/

window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
      // service workers not supported 😣
      return
    }
  
    navigator.serviceWorker.register('serviceworker.js').then(
      () => {
        // registered! 👍🏼
      },
      err => {
        console.error('SW registration failed! 😱', err)
      }
    )
  })