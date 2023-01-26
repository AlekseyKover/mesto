import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor({ submitForm }, selector) {
        super(selector);
        this._submitForm = submitForm;
        this._popupForm = this._selector.querySelector('.popup__form');
        this._submitButton = this._selector.querySelector('.popup__button');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitText = this._submitButton.textContent;
    }

    _getInputValues() {
        const inputsValues = {};
        this._inputList.forEach(item => {
            inputsValues[item.name] = item.value;
        });
        return inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    loading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = this._submitText;
        }
    }

    close() {
        super.close()
        this._popupForm.reset();
    }
}
