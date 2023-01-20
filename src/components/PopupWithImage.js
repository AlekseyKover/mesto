import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImageText = this._selector.querySelector('.popup__text');
        this._popupImageImage = this._selector.querySelector('.popup__image');
    }
    open = (cardData) => {
        this._popupImageText.textContent = cardData.name;
        this._popupImageImage.src = cardData.link;
        this._popupImageImage.alt = cardData.name;
        super.open()
    }
}