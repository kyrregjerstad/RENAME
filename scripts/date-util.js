const dateInput = document.querySelector("#dateInput");
const dateOutput = document.querySelector("#dateOutput");

export const setDate = () => {
  dateInput.valueAsDate = new Date();
  dateOutput.innerText = dateInput.value;
};
