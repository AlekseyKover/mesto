import { Popup } from "./Popup.js";
export class PopupWithSubmit extends Popup {
    constructor(selector) {
        super(selector);

        this._submitbutton = this._selector.querySelector('.popup__button');
    }

    submitCallback(removing) {
        this._handleSubmit = removing;
    }



    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit;

        });
    }
}