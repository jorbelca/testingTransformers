import { pipeline } from "./index.js";

// const imgTrigger = document.getElementById("img-trigger");

// imgTrigger.addEventListener("click", () => {
//   document.querySelector(".return-home").style.display = "block";
//   document.querySelector(".trigger-btns").style.display = "none";
// });

let image = document.getElementById("img");
image.addEventListener("change", async () => {
  if (image.files.length > 0) {
    //readURL(image.files[0]).then((res) => console.log(res));
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    let result = await classifier(await readURL(image.files[0]), { topk: 0 });
    let renderResult = document.getElementById("result-img");
    let mappedResults = "";
    result.forEach((element) => {
      if (element.score > 0.1) {
        console.log(`${element.label} => ${element.score}`);
        mappedResults += `<p>${element.label} => ${Math.ceil(
          element.score * 100
        )} %</p>`;
      }
    });
    renderResult.innerHTML = mappedResults;
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
