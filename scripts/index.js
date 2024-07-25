const cdnURL = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";
let pipeline;

async function loadPipeline() {
  const module = await import(cdnURL);
  pipeline = module.pipeline;
  self.pipeline = pipeline; // Hacer pipeline disponible globalmente
  self.cdnURL = cdnURL;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("scripts/web-workers/service-worker.js")
    .then(function () {
      console.log("Service Worker registrado con éxito");
      loadPipeline();
    })
    .catch(function (error) {
      console.error("Error al registrar el Service Worker:", error);
    });
} else {
  console.log("Service Workers not supported");
}
