export const cdnURL = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";

const module = await import(cdnURL);
export const { pipeline } = module;
self.cdnURL = cdnURL;
