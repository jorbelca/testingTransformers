import { apiKey } from "../key.js";
import { getComments } from "./getComments.js";

let input = document.getElementById("urlInput");
const spinner = document.querySelector(".fa-spinner");
let results = document.getElementById("results-expandable");
let btn = document.getElementById("btnTrigger");
let points = 0;
let comments = [];

btn.addEventListener("click", async () => {
  btn.setAttribute("disabled", true);
  results.innerText = "";
  spinner.style.display = "block";

  if (input.value.length > 0) {
    const regex = /v=([^&]+)/;
    let id = input.value.match(regex)[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=500`;
    comments = await getComments(apiUrl);
  } else {
    window.alert("Introduzca una URL valida.");
  }

  if (comments.length > 0) {
    const commentTexts = comments.map(
      (comment) => comment.snippet.topLevelComment.snippet.textOriginal
    );
    const chunks = chunkArray(commentTexts, 10);
    const chunkPromises = chunks.map((chunk) => analyzeComments(chunk));

    const allResults = await Promise.all(chunkPromises);

    // Procesar todos los resultados juntos
    allResults.flat().forEach((result) => {
      let p = document.createElement("p");
      p.innerText = `${result.text} is ${result.label} with ${Math.ceil(
        result.score * 100
      )}% accuracy`;
      p.style.color = setColor(result.label, result.score.toFixed(5));
      analysisPointerator(result.label, result.score);
      results.appendChild(p);
    });

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
    btn.removeAttribute("disabled");
  } else {
    alert("No comments found.");
    spinner.style.display = "none";
    btn.removeAttribute("disabled");
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
  if (label === "POSITIVE") {
    return `rgba(60, 179, 113, ${score})`;
  } else {
    return `rgba(255, 0, 0, ${score})`;
  }
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function analyzeComments(comments) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("/scripts/web-workers/workers.js");
    worker.postMessage(comments);
    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };
    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };
  });
}
