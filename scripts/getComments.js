export async function getComments(apiUrl) {
  if (!apiUrl) {
    alert("Por favor, ingresa un video de YouTube.");
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items) {
      return data.items;
    } else {
      alert("No se encontraron comentarios o ID de video no válido.");
    }
  } catch (error) {
    console.error("Error al recuperar comentarios:", error);
    alert("Ocurrió un error al recuperar los comentarios.");
  }
}
