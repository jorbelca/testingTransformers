import { pipeline } from "./index.js";

const tableResults = document.getElementById("tableResults");
const tableBody = tableResults.getElementsByTagName("tbody")[0];
let imageInput = document.getElementById("imgInput");
const imgPreview = document.getElementById("image_preview");
const spinner = document.querySelector(".fa-spinner");

imageInput.addEventListener("change", async () => {
  imageInput.setAttribute("disabled", true);
  spinner.style.display = "block";
  const file = imageInput.files;

  if (file.length > 0) {
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    tableBody.innerHTML = "";
    let result = await classifier(await readURL(file[0]), { topk: 0 });
    if (result) {
      spinner.style.display = "none";

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
  imageInput.removeAttribute("disabled");
});

// convert file to a base64 url && show image uploaded
const readURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      imgPreview.src = e.target.result;
      imgPreview.style.display = "block";
      res(e.target.result);
    };
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};
