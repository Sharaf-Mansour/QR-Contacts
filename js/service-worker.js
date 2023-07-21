const CACHE_NAME = 'Qr-cache-v1';
const urlsToCache = [
    '/',
    '/styles/style.css',
    '/styles/profile.css',
    '/js/script.js',
    '/js/js.js',
    '/js/qr.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});