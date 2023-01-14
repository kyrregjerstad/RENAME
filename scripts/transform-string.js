export const transformInputValues = (inputValue) => {
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
