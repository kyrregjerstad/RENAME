const form = document.querySelector("#input-form");
const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const courseInput = document.querySelector("#courseInput");
const assignmentShortcodeInput = document.querySelector(
  "#assignmentShortcodeInput"
);
const dateInput = document.querySelector("#dateInput");
const fileTypeInput = document.querySelector("#fileTypeInput");

const outputText = document.querySelector("#output-text");
const dateOutput = document.querySelector("#dateOutput");
const courseOutput = document.querySelector("#courseOutput");
const assignmentShortcodeOutput = document.querySelector(
  "#assignmentShortcodeOutput"
);
const firstNameOutput = document.querySelector("#firstNameOutput");
const lastNameOutput = document.querySelector("#lastNameOutput");
const fileTypeOutput = document.querySelector("#fileTypeOutput");

const inputFields = [
  firstNameInput,
  lastNameInput,
  courseInput,
  assignmentShortcodeInput,
  dateInput,
  fileTypeInput,
];

const outputFields = [
  dateOutput,
  courseOutput,
  assignmentShortcodeOutput,
  firstNameOutput,
  lastNameOutput,
  fileTypeOutput,
];

const fieldMapping = {
  courseInput: courseOutput,
  assignmentShortcodeInput: assignmentShortcodeOutput,
  firstNameInput: firstNameOutput,
  lastNameInput: lastNameOutput,
  fileTypeInput: fileTypeOutput,
  dateInput: dateOutput,
};

dateInput.valueAsDate = new Date();
dateOutput.innerText = dateInput.value;

const transformInputValues = (inputValue) => {
  if (inputValue.length === 0) {
    return "";
  }
  inputValue = inputValue.trim();
  inputValue = inputValue[0].toUpperCase() + inputValue.substring(1);
  inputValue = inputValue.replace(/ +/g, " ");
  inputValue = inputValue.replace(/ /g, "_");
  inputValue = inputValue.replace(/\./g, "");
  return inputValue;
};

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

const copyBtn = document.querySelector("#copy-text-icon");

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

let { firstName, lastName, course, assignmentShortcode, date, fileType } = "";

// move to change event listener
// if (targetId === "dateInput") {
//   console.log("ding");
//   dateOutput.innerText = inputValue;
// }
