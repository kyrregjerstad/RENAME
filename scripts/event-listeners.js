import { form, inputFields, dateOutput, fieldMapping } from "./constants.js";
import { transformInputValues } from "./transform-string.js";

export const copyBtn = document.querySelector("#copy-text-icon");
const outputText = document.querySelector("#output-text");

form.addEventListener("keyup", (e) => {
  let targetId = e.target.id;
  let inputValue = inputFields.find(
    (inputItem) => inputItem.id === targetId
  ).value;

  fieldMapping[targetId].innerText = transformInputValues(inputValue);
});

form.addEventListener("change", (e) => {
  let targetId = e.target.id;
  let inputValue = inputFields.find(
    (inputItem) => inputItem.id === targetId
  ).value;
  if (targetId === "dateInput") {
    dateOutput.innerText = inputValue;
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(outputText.innerText)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});
