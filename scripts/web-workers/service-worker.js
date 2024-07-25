importScripts("../index.js");

const CACHE_NAME = "transformers-cached-v1";
let classifier;

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Abriendo caché");
      return cache.add(cdnURL);
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

self.addEventListener("message", async function (event) {
  if (event.data.action === "analyzeChunk") {
    if (!classifier) {
      const module = await import(cdnURL);
      classifier = await module.pipeline("sentiment-analysis");
    }

    const results = await Promise.all(
      event.data.chunk.map(async (comment) => {
        console.log(comment);
        let analysis = await classifier(comment.trim());
        return {
          text: comment,
          label: analysis[0].label,
          score: analysis[0].score,
        };
      })
    );

    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          action: "displayResult",
          results: results,
          chunkIndex: event.data.chunkIndex,
        });
      });
    });
  }
});
