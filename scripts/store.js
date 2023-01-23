export const retrieveUser = () => {
  try {
    const savedFirstName = JSON.parse(localStorage.getItem("firstName"));
    const savedLastName = JSON.parse(localStorage.getItem("lastName"));

    if (savedFirstName.length) {
      firstNameInput.value = savedFirstName;
      firstNameOutput.innerText = savedFirstName;
    }
    if (savedLastName.length) {
      lastNameInput.value = savedLastName;
      lastNameOutput.innerText = savedLastName;
    }
  } catch (error) {
    console.warn("There was an error fetching user data", error);
  }
};

export const storeUser = (targetId, inputValue) => {
  inputValue = JSON.stringify(inputValue);

  if (targetId === "firstNameInput") {
    localStorage.setItem("firstName", inputValue);
  }
  if (targetId === "lastNameInput") {
    localStorage.setItem("lastName", inputValue);
  }
};
