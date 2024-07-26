console.log("Service Worker cargado");

//importScripts("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1");

let classifier;

self.addEventListener("install", function (event) {
  console.log("Service Worker instalado");
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activado");
});

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open("transformers-cached-v1").then(function (cache) {
//       console.log("Abriendo caché");
//       return cache.add([
//         "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1",
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response) {
//         return response; // Devuelve la respuesta desde la caché si está disponible
//       }
//       return fetch(event.request); // Realiza una petición de red si no está en la caché
//     })
//   );
// });

// MULTITHREAD SIMULADO
self.addEventListener("message", async function (event) {
  console.log("Mensaje recibido en el Service Worker:", event.data);

  if (event.data.action === "setupClassifier") {
    if (!classifier) {
      const module = await import("../libs/transformers.js");
      classifier = await module.pipeline("sentiment-analysis");
      console.log("Clasificador configurado en el Service Worker");
    }
  }

  if (event.data.action === "analyzeChunk") {
    const results = await Promise.all(
      event.data.chunk.map(async (comment) => {
        let analysis = await classifier(comment.trim());
        return {
          text: comment,
          label: analysis[0].label,
          score: analysis[0].score,
        };
      })
    );

    console.log("Resultados del análisis:", results);

    event.ports[0].postMessage({
      action: "displayResult",
      results: results,
      chunkIndex: event.data.chunkIndex,
    });
  }
});
