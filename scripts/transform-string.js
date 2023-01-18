export const transformInputValues = (inputValue, targetId) => {
  if (inputValue.length === 0) {
    return "";
  }
  inputValue = inputValue.trim();
  inputValue = inputValue.replace(/ +/g, " ");
  const words = inputValue.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  inputValue = words.join(" ");
  if (targetId === "firstNameInput" || targetId === "lastNameInput") {
    inputValue = inputValue.replace(/ /g, "-");
  } else {
    inputValue = inputValue.replace(/ /g, "_");
  }
  inputValue = inputValue.replace(/\./g, "");
  return inputValue;
};
