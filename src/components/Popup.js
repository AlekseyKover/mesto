export  class Popup {
    constructor(selector) {
        this._selcetor = document.querySelector(selector);
    }
    open() {
        this._selcetor.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close()  {
        this._selcetor.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) =>{
        if (evt.key === "Escape"){
            this.close()
        }
    }
    setEventListeners  ()  {
    
            this._selcetor.addEventListener('mousedown', (event) => {
                if (event.target.classList.contains('popup_opened')) {
                    this.close()
                }
                if (event.target.classList.contains('popup__close')) {
                   this.close()
                }
            })
        
    }
}