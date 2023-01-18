import { inputFields, fieldMapping } from "./constants.js";
import { transformInputValues } from "./transform-string.js";

export const setFieldsOnLoad = () => {
  Object.keys(fieldMapping).forEach((item) => {
    const inputValue = inputFields.find(
      (inputItem) => inputItem.id === item
    ).value;
    console.log(inputValue);
    if (inputValue === "") {
      return;
    }
    fieldMapping[item].innerText = transformInputValues(inputValue, item);
  });
};
