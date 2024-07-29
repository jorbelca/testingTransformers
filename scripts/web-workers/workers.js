let classifier;

// MULTITHREAD SIMULADO
self.addEventListener("message", async function (event) {
  if (!classifier) {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1"
    );
    classifier = await module.pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );
  }

  const comments = event.data;
  const results = await Promise.all(
    comments.map(async (comment) => {
      const analysis = await classifier(comment.trim());
      return {
        text: comment,
        label: analysis[0].label,
        score: analysis[0].score,
      };
    })
  );

  postMessage(results);
});
