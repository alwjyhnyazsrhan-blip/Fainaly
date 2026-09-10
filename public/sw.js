const CACHE_NAME = 'kings-of-the-deep-v8';
const ASSETS_TO_CACHE = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/backgrounds/harbor_main.webp',
  '/backgrounds/destroyed_port.webp',
  '/backgrounds/ship_bg.webp',
  '/ships/ship_00.webp',
  '/ships/ship_01.webp',
  '/icons/res/gold-coin.webp',
  '/icons/res/gem.webp'
];

// Install Service Worker and cache essential media assets only
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const cachePromises = ASSETS_TO_CACHE.map((asset) => {
        return cache.add(asset).catch((err) => {
          console.warn(`Failed to cache asset during install: ${asset}`, err);
        });
      });
      return Promise.all(cachePromises);
    })
  );
});

// Activate, purge any previous caches, and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Message listener to skip waiting or purge all caches on request
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    caches.keys().then((names) => {
      return Promise.all(names.map((name) => caches.delete(name)));
    });
  }
});

// Helper to determine if request is for image or game media asset
function isMediaOrImageRequest(url) {
  return (
    url.includes('githubusercontent.com') ||
    url.includes('unsplash.com') ||
    /\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i.test(url)
  );
}

// Fetch strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return;
  }

  // Skip video requests
  if (url.endsWith('.mp4') || url.includes('/background_video.mp4')) {
    return;
  }

  // Never intercept scripts, modules, vite internals, or APIs
  // Always let the browser and Vite handle code directly
  if (
    event.request.destination === 'script' ||
    url.includes('/src/') ||
    url.includes('/node_modules/') ||
    url.includes('/@vite') ||
    url.includes('/@fs') ||
    url.includes('/@id') ||
    url.includes('/api/') ||
    url.includes('firestore.googleapis.com') || 
    url.includes('identitytoolkit.googleapis.com') ||
    url.includes('securetoken.googleapis.com') ||
    url.includes('googleapis.com') ||
    url.includes('firebaseapp.com') ||
    url.includes('google.com') ||
    url.includes('gstatic.com') ||
    url.includes('chrome-extension')
  ) {
    return;
  }

  // 1. Navigation requests: Network-First with fallback to cache only if offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request) || await caches.match('/index.html') || await caches.match('/');
          if (cached) return cached;
          return new Response('Network unavailable', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  // 2. Images and media assets (Cache-First + Background Revalidate)
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

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Pre-cached shell image assets
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
  }
});

