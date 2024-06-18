import { pipeline } from "./index.js";

const tableResults = document.getElementById("tableResults");
const tableBody = tableResults.getElementsByTagName("tbody")[0];
let image = document.getElementById("img");
const spinner = document.querySelector(".fa-spinner");

image.addEventListener("change", async () => {
  spinner.style.visibility = "visible";
  if (image.files.length > 0) {
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    let result = await classifier(await readURL(image.files[0]), { topk: 0 });
    if (result) {
      spinner.style.visibility = "hidden";
      tableBody.innerHTML = "";
      result.forEach((element) => {
        if (element.score > 0.1) {
          tableBody.innerHTML += `
        <tr>
        <td>${Math.ceil(element.score * 100)} % </td>
        <td>${element.label}
        </td>
      </tr>`;
        }
      });
    }
    tableResults.style.visibility = "visible";
  }
});

// convert file to a base64 url
const readURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};
