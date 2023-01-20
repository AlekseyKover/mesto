import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor({ submitForm }, selector) {
        super(selector);
        this._submitForm = submitForm;
        this._popupForm = this._selector.querySelector('.popup__form');
        this._inputForm = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        const inputsValues = {};
        this._inputForm.forEach(item => {
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

    close() {
        super.close()
        this._popupForm.reset();
    }
}
