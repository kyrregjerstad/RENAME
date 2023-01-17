export const transformInputValues = (inputValue, targetId) => {
  if (inputValue.length === 0) {
    return "";
  }
  inputValue = inputValue.trim();
  inputValue = inputValue[0].toUpperCase() + inputValue.substring(1);
  inputValue = inputValue.replace(/ +/g, " ");
  if (targetId === "firstNameInput" || targetId === "lastNameInput") {
    inputValue = inputValue.replace(/ /g, "-");
  } else {
    inputValue = inputValue.replace(/ /g, "_");
  }
  inputValue = inputValue.replace(/\./g, "");

  return inputValue;
};
