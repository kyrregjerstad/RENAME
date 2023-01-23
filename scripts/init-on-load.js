import { inputFields, fieldMapping, outputField } from "./constants.js";
import { transformInputValues } from "./transform-string.js";

export const setFieldsOnLoad = () => {
  try {
    Object.keys(fieldMapping).forEach((item) => {
      const inputValue = inputFields.find(
        (inputItem) => inputItem.id === item
      ).value;
      if (inputValue === "") {
        return;
      }
      fieldMapping[item].innerText = transformInputValues(inputValue, item);
    });
  } catch (error) {
    console.warn(error)(
      (outputField.innerHTML =
        "There was an error starting this application, try clearing Cache & Cookies")
    ),
      +error;
  }
};
