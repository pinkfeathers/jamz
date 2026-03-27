const CACHE_NAME = 'jamz-v3'; // Change this number (v4, v5...) whenever you update the HTML
const assets = [
  'index.html',
  'manifest.json',
  'pfp.png'
];

// Install: Cache the new assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  // Force the waiting service worker to become the active service worker immediately
  self.skipWaiting();
});

// Activate: Purge old caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  // Ensure the new service worker takes control of the page immediately
  self.clients.claim();
});

// Fetch: Serve from cache, but update from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
                      
