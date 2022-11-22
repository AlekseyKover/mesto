const showInputError = (errorElement, errorMessage, validationConfig,) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorClass);
}
const hidenInputError = (errorElement, validationConfig) => {
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.inputErrorClass);
}

const disabledButton = (buttonElement) => {
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.setAttribute("disabled", true);

}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {

  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  if (hasInvalidInput) {
    toggleButtonCheckOn(buttonElement, validationConfig);
  }
  else {
    toggleButtonCheckOff(buttonElement, validationConfig);
  }

}

const toggleButtonCheckOn = (buttonElement, validationConfig) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const toggleButtonCheckOff = (buttonElement, validationConfig) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const checkInputValidity = (inputElement, validationConfig) => {
  const isValid = inputElement.validity.valid;
  const formSection = inputElement.closest(validationConfig.sectionSelector);
  const errorElement = formSection.querySelector(validationConfig.errorClass)

  if (isValid) {
    hidenInputError(errorElement, validationConfig);
  } else {
    showInputError(errorElement, inputElement.validationMessage, validationConfig);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig)
    })
  })
}
const enableValidation = (validationConfig) => {
  const form = document.querySelectorAll(validationConfig.formSelector);
  form.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  })
}
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  sectionSelector: '.popup__section',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: '.popup__input-error'
}


