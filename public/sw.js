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

self.addEventListener("fetch", (event) => {

  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.searchParams.get("shared") === "true") {

    event.respondWith(

      (async () => {

        const formData = await event.request.formData();

        const file = formData.get("arquivo");

        // Armazene o arquivo (ex: IndexedDB, Cache, etc.)

        const cache = await caches.open("shared-files");

        await cache.put("/shared-data", new Response(file));

        return Response.redirect("/?shared=1", 303);

      })()

    );

  }

});