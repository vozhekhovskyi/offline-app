const { assets } = global.serviceWorkerOption;

const CACHE_VERSION = new Date().toISOString();
const CACHE_NAME = `statics-${CACHE_VERSION}`;
const expectedCaches = [CACHE_NAME];

self.addEventListener('install', event => {
  console.log('--> install', event);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache
      .addAll([...assets, './'])
      .catch(e => {
        console.warn('[SW] fail cache.addAll', e);
        return e;
      }),
    )
  );
});

self.addEventListener('activate', event => {
  console.log('~~ activate', event);

  // delete old cache, because it is unused by new SW
  // and free some cache storage memory
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetch // event', event);

  if (isRequestAllowedForCache(event.request)) {
    // cache-first strategy
    event.respondWith(getFromCache(event.request));
  }

  event.waitUntil(
    fetch(event.request).then(response => {
      if (isRequestAllowedForCache(event.request)) {
        return updateCache(event.request, response)
          .then(() => informClientsAboutCacheUpdate(response))
          .then(() => response)
          // in case if writing to cache or another operation fails
          .catch(e => response);
      }
      return response;
    })
  );
});

function isRequestAllowedForCache(request) {
  const url = new URL(request.url);
  // same origin and 'GET' request ONLY
  return url.origin === location.origin && request.method === 'GET'
}

function getFromCache(request) {
  return caches.open(CACHE_NAME).then(cache => cache.match(request));
}

function updateCache(request, response) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.put(request, response.clone());
  });
}

function informClientsAboutCacheUpdate(response) {
  // stub
  return Promise.resolve();
}

