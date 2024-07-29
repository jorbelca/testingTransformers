export const cdnURL = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";

export const modeloTexto =
  "sentiment-analysis, Xenova/distilbert-base-uncased-finetuned-sst-2-english";
export const modeloImagen = "image-classification, Xenova/vit-base-patch16-224";

const module = await import(cdnURL);
export const { pipeline } = module;
self.cdnURL = cdnURL;

// Precargar los modelos
const prefetchModel = async (model) => {
  try {
    await pipeline(model);
    console.log(`Successfully prefetched `);
  } catch (error) {
    console.error("Error during prefetching models:", error);
  }
};

const listCacheFiles = async () => {
  try {
    const cache = await caches.open("transformers-cache");
    const models = await cache.keys();
    if (models.length === 0) {
      prefetchModel(modeloTexto.split(",")[0]);
      prefetchModel(modeloImagen.split(",")[0]);
    }

    //PARA DEPURAR, HAY QUE AFINAR EL COMPROBAR Y MAPEAR LOS DIFERENTES MODELOS

    // models.forEach((model) => {
    //   if (!model.url.includes(modeloTexto.split(",")[1])) {
    //     prefetchModel(modeloTexto.split(",")[0]);
    //   }
    //   if (!model.url.includes(modeloImagen.split(",")[1])) {
    //     prefetchModel(modeloImagen.split(",")[0]);
    //   }
    // });
  } catch (error) {
    console.error("Error listing cache files:", error);
  }
};

// Llamar a la función para listar archivos en la cache 'model-cache' i si no hacer el prefetch
listCacheFiles();
