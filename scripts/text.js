import { pipeline } from "./index.js";

let text = document.getElementById("texto");
const spinner = document.querySelector(".fa-spinner");
let btn = document.getElementById("btnTrigger");
const form = document.querySelector(".input_text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  btn.setAttribute("disabled", true);
  spinner.style.display = "block";
  if (!text || text.value.length < 1) {
    document.getElementById("result").innerText = "No text";
  } else {
    let classifier = await pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );
    let result = await classifier(text.value);

    document.getElementById("result").innerText = `The text is ${
      result[0].label
    } with ${Math.ceil(result[0].score * 100)} % accuracy`;
  }
  spinner.style.display = "none";
  btn.removeAttribute("disabled");
});

//Altura auto textarea
text.addEventListener("input", function () {
  text.style.height = "auto";
  text.style.height = text.scrollHeight + "px";
});

// Submit con enter

// text.addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();

//     form.submit();
//   }
// });
