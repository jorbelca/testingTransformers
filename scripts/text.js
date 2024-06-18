import { pipeline } from "./index.js";

let text = document.getElementById("texto");

document.getElementById("btn").addEventListener("click", async () => {
  //console.log(text.value.length);
  if (!text || text.value.length < 1) {
    document.getElementById("result").innerText = "No text";
  } else {
    let classifier = await pipeline("sentiment-analysis");
    let result = await classifier(text.value);

    document.getElementById("result").innerText = `The text is ${
      result[0].label
    } with ${Math.ceil(result[0].score * 100)} % accuracy`;
  }
});
