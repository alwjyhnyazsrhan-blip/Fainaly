const CACHE_NAME = 'kings-of-the-deep-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Service Worker and cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const cachePromises = ASSETS_TO_CACHE.map((asset) => {
        return cache.add(asset).catch((err) => {
          console.warn(`Failed to cache asset during install: ${asset}`, err);
        });
      });
      return Promise.all(cachePromises);
    }).then(() => self.skipWaiting())
  );
});

// Activate and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper to determine if request is for image or game media asset
function isMediaOrImageRequest(url) {
  return (
    url.includes('githubusercontent.com') ||
    url.includes('unsplash.com') ||
    /\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i.test(url)
  );
}

// Robust fetch strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return;
  }

  // Skip video range requests
  if (url.endsWith('.mp4') || url.includes('/background_video.mp4')) {
    return;
  }

  // Skip dynamic API / Firebase calls
  if (
    url.includes('firestore.googleapis.com') || 
    url.includes('identitytoolkit.googleapis.com') ||
    url.includes('securetoken.googleapis.com') ||
    url.includes('googleapis.com')
  ) {
    return;
  }

  // 1. Navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // 2. Images, GitHub raw assets, and media (Cache-First + Background Revalidate)
  if (isMediaOrImageRequest(url)) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: false }).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque' || networkResponse.type === 'cors')) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        // Serve cached version immediately if available!
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Standard shell asset requests
  const isShellAsset = ASSETS_TO_CACHE.some(asset => url.endsWith(asset) || url.includes(asset));

  if (isShellAsset) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  } else {
    // Network-First with Cache Fallback
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && (response.status === 200 || response.type === 'opaque' || response.type === 'cors')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request, { ignoreSearch: true });
        })
    );
  }
});
