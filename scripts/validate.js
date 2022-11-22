

const showInputError = (errorElement, errorMessage, enableValidation,) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.inputErrorClass);
}
const hidenInputError = (errorElement, enableValidation) => {
  errorElement.textContent = '';
  errorElement.classList.remove(enableValidation.inputErrorClass);

}

const toggleButtonState = (inputList, buttonElement, enableValidation) => {

  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  if (hasInvalidInput) {
    toggleButtonCheckOn(buttonElement, enableValidation);
  }
  else {

    toggleButtonCheckOff(buttonElement, enableValidation);
  }

}

const toggleButtonCheckOn = (buttonElement, enableValidation) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(enableValidation.inactiveButtonClass);
}

const toggleButtonCheckOff = (buttonElement, enableValidation) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(enableValidation.inactiveButtonClass);
}



const checkInputValidity = (inputElement, enableValidation) => {

  const isValid = inputElement.validity.valid;

  const formSection = inputElement.closest(enableValidation.sectionSelector);
  const errorElement = formSection.querySelector(enableValidation.errorClass)

  if (isValid) {
    hidenInputError(errorElement, enableValidation);
  } else {
    showInputError(errorElement, inputElement.validationMessage, enableValidation);
  }
}

const setEventListeners = (formElement, enableValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, enableValidation);
      toggleButtonState(inputList, submitButton, enableValidation)
    })
  })
}
const formElementList = (enableValidation) => {
  const form = document.querySelectorAll(enableValidation.formSelector);
  form.forEach(formElement => {
    setEventListeners(formElement, enableValidation);
  })
}
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  sectionSelector: '.popup__section',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: '.popup__input-error'
}


