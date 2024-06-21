importScripts("./index.js");

const CACHE_NAME = "transformers-cached-v1";

self.addEventListener("install", function (event) {
  console.log("entra");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Abriendo caché");
      return cache.addAll(cdnURL);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response; // Devuelve la respuesta desde la caché si está disponible
      }
      return fetch(event.request); // Realiza una petición de red si no está en la caché
    })
  );
});
