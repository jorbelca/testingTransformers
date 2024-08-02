export let apiKey;

if (window.location.hostname === "testing-transformers.vercel.app") {
  fetch("/api/getApiKey")
    .then((response) => response.json())
    .then((data) => {
      apiKey = data.apiKey;
    })
    .catch((error) => console.error("Error fetching API key:", error));
} else {
  import("../key.js").then((module) => {
    apiKey = module.Key;
  });
}
