import { apiKey } from "../key.js";
import { getComments } from "./getComments.js";
import { pipeline } from "./index.js";

//let idTest = "wtLJPvx7-ys";

let input = document.getElementById("urlInput");
const spinner = document.querySelector(".fa-spinner");
let results = document.getElementById("results-expandable");
let points = 0;
let comments = [];

document.getElementById("btn").addEventListener("click", async () => {
  results.innerText = "";
  spinner.style.display = "block";

  let classifier = await pipeline("sentiment-analysis");

  if (input.value.length > 0) {
    const regex = /v=([^&]+)/;
    let id = input.value.match(regex)[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=500`;
    comments = await getComments(apiUrl);
  } else {
    alert("Introduzca una URL valida.");
  }

  if (comments.length > 0) {
    let promise = comments.map(async (comment) => {
      let text = comment.snippet.topLevelComment.snippet.textOriginal;
      let analysis = await classifier(text.trim());
      let p = document.createElement("p");

      p.innerText = `${text} is ${analysis[0].label} with ${Math.ceil(
        analysis[0].score * 100
      )} % accuracy`;
      p.style.color = setColor(analysis[0].label, analysis[0].score.toFixed(5));
      analysisPointerator(analysis[0].label, analysis[0].score);
      results.appendChild(p);
    });
    await Promise.all(promise);

    // Calcula el porcentaje final basado en los puntos
    let positivePercentage = (points / comments.length + 1 / 2) * 100;

    // Actualiza el contador final
    let summary = document.createElement("p");

    let positivePercent =
      positivePercentage > 0 ? positivePercentage.toFixed(2) : 0;

    summary.innerText += `${positivePercent}% POSITIVE`;

    summary.style.backgroundColor = setColor("POSITIVE", positivePercent / 100);
    summary.style.fontWeight = "bold";
    results.prepend(summary);

    spinner.style.display = "none";
  }
});

function analysisPointerator(label, score) {
  if (label === "POSITIVE") {
    points += score;
  } else {
    points -= score;
  }
}

function setColor(label, score) {
  console.log(score);
  if (label === "POSITIVE") {
    return `rgba(60,179,113,${score})`;
  } else {
    return `rgba(255,0,0,${score})`;
  }
}
