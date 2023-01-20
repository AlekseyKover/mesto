export class Popup {
    constructor(selector) {
        this._selector = document.querySelector(selector);
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close()
        }
    }

    setEventListeners() {

        this._selector.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_opened')) {
                this.close()
            }
            if (event.target.classList.contains('popup__close')) {
                this.close()
            }
        })
    }
}