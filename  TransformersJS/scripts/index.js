import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";

let text = document.getElementById("texto").value;
document.getElementById("btn").addEventListener("click", async () => {
  console.log(text.value);
  if (!text || text.length() < 1) {
    document.getElementById("result").innerText = "No text";
  } else {
    let classifier = await pipeline("sentiment-analysis");
    let result = await classifier(text);

    document.getElementById("result").innerText = `The text is ${
      result[0].label
    } with ${Math.ceil(result[0].score * 100)} % accuracy`;
  }
});
