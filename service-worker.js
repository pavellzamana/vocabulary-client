const CACHE_NAME = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(() => self.skipWaiting()));
});

/* listener onactivate event, take all cache and delete old one */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((caches) => {
        return Promise.all(
          caches.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((error) => {
        throw new Error('Failed to get cache, error: ', error.message);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(takeCacheOrFetch(event));
  event.waitUntil(updateCache(event));
});

/* function witch try to find request in cache, otherwise fetch this request and put it into cache */
function takeCacheOrFetch(event) {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request)
          .then((response) => {
            if (!(event.request.url.indexOf('http') === 0)) {
              return response;
            }
            if (event.request.method !== 'POST') {
                cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch((error) => {
            throw new Error('Failed to fetch request, error: ', error.message);
          })
      );
    });
  });
}

/* function witch update cache, skipping http requests */
function updateCache(event) {
  return caches.open(CACHE_NAME).then((cache) =>
    fetch(event.request)
      .then((response) => {
        if (!(event.request.url.indexOf('http') === 0)) {
          return response;
        }
        if (event.request.method !== 'POST') {
            cache.put(event.request, response);
        }
      })
      .catch((error) => {
        throw new Error('Failed to update cache, error: ', error.message);
      })
  );
}

/* listener onpush event, show message according event data */
self.addEventListener('push', function (event) {
  if (event.data) {
    self.registration.showNotification('Unforgivable Curses', {
      body: event.data.text(),
    });
  }
});

/* 
listener onnotificationclick event, 
check if at least one client is open and then focus on it,
otherwise open new client 
*/
self.addEventListener('notificationclick', (event) => {
  event.waitUntil(
    self.clients
      .matchAll()
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return self.clients.openWindow('our/url/page');
      })
      .catch((error) => {
        throw new Error('Failed to get all clients, error: ', error.message);
      })
  );
});
