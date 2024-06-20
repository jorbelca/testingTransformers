import { pipeline } from "./index.js";
import { apiKey } from "../key.js";

let idTest = "wtLJPvx7-ys";

const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${idTest}&maxResults=100`;

let input = document.getElementById("urlInput");
const spinner = document.querySelector(".fa-spinner");
let result = document.getElementById("result");
let points = 0;

document.getElementById("btn").addEventListener("click", async () => {
  spinner.style.visibility = "visible";

  let classifier = await pipeline("sentiment-analysis");

  let response = await getComments(apiUrl);

  let promise = array.map(async (phrase) => {
    let analysis = await classifier(phrase.trim());
    result.innerText += `${phrase} is ${analysis[0].label} with ${Math.ceil(
      analysis[0].score * 100
    )} % accuracy\n`;
    analysisPointerator(analysis[0].label, analysis[0].score);
  });
  await Promise.all(promise);

  // Calcula el porcentaje final basado en los puntos
  let positivePercentage = (points / array.length + 1 / 2) * 100;

  // Actualiza el resultado final
  result.innerText += `${positivePercentage.toFixed(2)}% POSITIVE`;

  spinner.style.visibility = "hidden";
});

function analysisPointerator(label, score) {
  if (label === "POSITIVE") {
    points += score;
  } else {
    points -= score;
  }
}

async function getComments(apiUrl) {
  //const videoId = document.getElementById("videoId").value;

  //   if (!videoId) {
  //     alert("Por favor, ingresa un ID de video de YouTube.");
  //     return;
  //   }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data.items) {
      displayComments(data.items);
    } else {
      alert("No se encontraron comentarios o ID de video no válido.");
    }
  } catch (error) {
    console.error("Error al recuperar comentarios:", error);
    alert("Ocurrió un error al recuperar los comentarios.");
  }
}

function displayComments(comments) {
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";

  comments.forEach((comment) => {
    const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
    const author = comment.snippet.topLevelComment.snippet.authorDisplayName;
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `<p><strong>${author}:</strong> ${commentText}</p>`;
    commentsDiv.appendChild(commentElement);
  });
}
