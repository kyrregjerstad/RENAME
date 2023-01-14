export const retrieveUser = () => {
  const savedFirstName = localStorage.getItem("firstName");
  const savedLastName = localStorage.getItem("lastName");

  if (savedFirstName !== "") {
    firstNameInput.value = savedFirstName;
    firstNameOutput.innerText = savedFirstName;
  }
  if (savedLastName !== "") {
    lastNameInput.value = savedLastName;
    lastNameOutput.innerText = savedLastName;
  }
};

export const storeUser = (targetId, inputValue) => {
  if (targetId === "firstNameInput") {
    localStorage.setItem("firstName", inputValue);
  }
  if (targetId === "lastNameInput") {
    localStorage.setItem("lastName", inputValue);
  }
};
