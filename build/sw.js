const CACHE_NAME = 'meu-site-v1';

const urlsToCache = [

  '/',

  '/index.html',

  '/style.css',

  '/script.js',

  '/icon-192.png'

];

self.addEventListener('install', (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then((cache) => cache.addAll(urlsToCache))

  );

});

self.addEventListener('fetch', (event) => {

  event.respondWith(

    caches.match(event.request)

      .then((response) => response || fetch(event.request))

  );

});