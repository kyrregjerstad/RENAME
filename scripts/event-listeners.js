import {
  form,
  inputFields,
  dateOutput,
  fieldMapping,
  copyTooltip,
} from "./constants.js";
import { storeUser } from "./store.js";
import { transformInputValues } from "./transform-string.js";

const jsConfetti = new JSConfetti();

export const copyBtn = document.querySelector("#copy-text-icon");
const outputText = document.querySelector("#output-text");

form.addEventListener("keyup", (e) => {
  let targetId = e.target.id;
  let inputValue = inputFields.find(
    (inputItem) => inputItem.id === targetId
  ).value;
  storeUser(targetId, inputValue);

  fieldMapping[targetId].innerText = transformInputValues(inputValue, targetId);
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
  copyTooltip.innerText = "Copied! 🎉";
  jsConfetti.addConfetti({
    // emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
    confettiRadius: 6,
    confettiNumber: 50,
  });
});

copyBtn.addEventListener("mouseover", () => {
  copyTooltip.classList.remove("hidden");
});

copyBtn.addEventListener("mouseleave", () => {
  copyTooltip.classList.add("hidden");
  copyTooltip.innerText = "Click to copy";
});
