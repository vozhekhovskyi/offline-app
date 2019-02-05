const CACHE_VERSION = 1;

self.addEventListener('install', event => {
  console.log('--> install', event);

  event.waitUntil(
    caches
      .open(`static-v${CACHE_VERSION}`)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          // '/static/js/',
        ]).then(e => {
          console.log('success cache.addAll', e);
          return e;
        });
      })
  );
});

self.addEventListener('activate', event => {
  console.log('~~ activate', event);
});

self.addEventListener('fetch', event => {
  console.log('>>...<< fetch', event);

  const url = new URL(event.request.url);
  // const isSameOrigin = url.origin === location.origin;

  // if (isSameOrigin) {}

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(async response => {
        if (url.pathname.includes('/static/js/')) {
          await caches
            .open(`static-v${CACHE_VERSION}`)
            .then(cache => {
              return cache.add(url.pathname).then(e => {
                console.log('success cache.add for js', e);
                return e;
              });
            });
        }
        return response;
      });
    })
  );
});
