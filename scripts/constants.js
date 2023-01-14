export const form = document.querySelector("#input-form");
export const firstNameInput = document.querySelector("#firstNameInput");
export const lastNameInput = document.querySelector("#lastNameInput");
export const courseInput = document.querySelector("#courseInput");
export const assignmentShortcodeInput = document.querySelector(
  "#assignmentShortcodeInput"
);
export const dateInput = document.querySelector("#dateInput");
export const fileTypeInput = document.querySelector("#fileTypeInput");

export const dateOutput = document.querySelector("#dateOutput");
export const courseOutput = document.querySelector("#courseOutput");
export const assignmentShortcodeOutput = document.querySelector(
  "#assignmentShortcodeOutput"
);
export const firstNameOutput = document.querySelector("#firstNameOutput");
export const lastNameOutput = document.querySelector("#lastNameOutput");
export const fileTypeOutput = document.querySelector("#fileTypeOutput");

export const inputFields = [
  firstNameInput,
  lastNameInput,
  courseInput,
  assignmentShortcodeInput,
  dateInput,
  fileTypeInput,
];

export const fieldMapping = {
  courseInput: courseOutput,
  assignmentShortcodeInput: assignmentShortcodeOutput,
  firstNameInput: firstNameOutput,
  lastNameInput: lastNameOutput,
  fileTypeInput: fileTypeOutput,
  dateInput: dateOutput,
};
