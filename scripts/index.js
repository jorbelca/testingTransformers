export const cdnURL = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../scripts/service-worker.js")
    .then(function () {
      console.log("Service Worker registrado con éxito");
    })
    .catch(function (error) {
      console.error("Error al registrar el Service Worker:", error);
    });
}

const module = await import(cdnURL);
export const { pipeline } = module;
self.cdnURL = cdnURL;
