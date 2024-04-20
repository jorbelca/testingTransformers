import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1";

let text = document.getElementById("texto").value;
document.getElementById("btn").addEventListener("click", async () => {
  console.log(text.value);
  if (!text || text.length() < 1) {
    document.getElementById("result").innerText = "No text";
  } else {
    let classifier = await pipeline("sentiment-analysis");
    let result = await classifier(text);

    document.getElementById("result").innerText = `The text is ${
      result[0].label
    } with ${Math.ceil(result[0].score * 100)} % accuracy`;
  }
});

let image = document.getElementById("img");
image.addEventListener("change", async () => {
  if (image.files.length > 0) {
    //readURL(image.files[0]).then((res) => console.log(res));
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    let result = await classifier(await readURL(image.files[0]), { topk: 0 });
    result.forEach((element) => {
      if (element.score > 0.1) {
        console.log(`${element.label} => ${element.score}`);
      }
    });
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
