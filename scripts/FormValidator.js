export default class FormValidator {
    constructor(validationConfig, objectForm,) {
        this._validationConfig = validationConfig;
        this._objectForm = objectForm;
        this._inputList = Array.from(this._objectForm.querySelectorAll(this._validationConfig.inputSelector));
        this._submitButton = this._objectForm.querySelector(this._validationConfig.submitButtonSelector);
    }

    _showInputError = (errorMessage) => {
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._validationConfig.inputErrorClass);
    }
    _hidenInputError = () => {
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._validationConfig.inputErrorClass);
    }
    _checkInputValidity = (inputElement,) => {
        const isValid = inputElement.validity.valid;
        const formSection = inputElement.closest(this._validationConfig.sectionSelector);
        this._errorElement = formSection.querySelector(this._validationConfig.errorClass);
        if (isValid) {
            this._hidenInputError();
        } else {
            this._showInputError(inputElement.validationMessage);
        }
    }

    _disableButton = () => {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    }

    _activateButton = () => {
        this._submitButton.removeAttribute("disabled");
        this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    }

    _toggleButtonState = () => {

        const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
        if (hasInvalidInput) {
            this._disableButton();
        }
        else {
            this._activateButton();
        }

    }


    _setEventListeners = () => {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState()
            })
        })
    }


    resetValidation(){
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hidenInputError(inputElement)
        });
    }




    enableValidation = () => {
        this._setEventListeners();
    }
}