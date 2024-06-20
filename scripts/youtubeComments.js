import { apiKey } from "../key.js";
import { getComments } from "./getYoutubeComments.js";
import { pipeline } from "./index.js";

//let idTest = "wtLJPvx7-ys";

let input = document.getElementById("urlInput");
const spinner = document.querySelector(".fa-spinner");
let result = document.getElementById("results-expandable");
let points = 0;
let comments = [];

document.getElementById("btn").addEventListener("click", async () => {
  spinner.style.visibility = "visible";

  let classifier = await pipeline("sentiment-analysis");

  if (input.value.length > 0) {
    const regex = /v=([^&]+)/;
    let id = input.value.match(regex)[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=500`;
    comments = await getComments(apiUrl);
  } else {
    alert("Introduzca una URL valida.");
  }
  result.innerHTML = "";

  if (comments.length > 0) {
    let promise = comments.map(async (comment) => {
      let text = comment.snippet.topLevelComment.snippet.textOriginal;
      let analysis = await classifier(text.trim());
      let p = document.createElement("p");

      p.innerText = `${text} is ${analysis[0].label} with ${Math.ceil(
        analysis[0].score * 100
      )} % accuracy`;

      analysisPointerator(analysis[0].label, analysis[0].score);
      result.appendChild(p);
    });
    await Promise.all(promise);

    // Calcula el porcentaje final basado en los puntos
    let positivePercentage = (points / comments.length + 1 / 2) * 100;

    // Actualiza el contador final
    let summary = document.createElement("p");
    summary.innerText += `${positivePercentage.toFixed(2)}% POSITIVE`;
    result.appendChild(summary);

    spinner.style.visibility = "hidden";
  }
});

function analysisPointerator(label, score) {
  if (label === "POSITIVE") {
    points += score;
  } else {
    points -= score;
  }
}
