export async function getComments(apiUrl) {
  if (!apiUrl) {
    alert("Por favor, ingresa un video de YouTube.");
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data.items) {
      return data.items;
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
