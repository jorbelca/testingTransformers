export let apiKey;

if (window.location.hostname === "jorbelca.github.io") {
  import("./config.production.js").then((module) => {
    apiKey = module.Key;
  });
} else {
  import("../key.js").then((module) => {
    apiKey = module.Key;
  });
}
