export class Card {
    constructor(card, template, popupImage) {
        this._cardData = card;
        this._elemenTemplate = template;
        this._openPopupImage = popupImage;
        this._name = card.name;
        this._link = card.link;
    }

    _getElemtnTemplate = () => {
        const templateCard = document
            .querySelector(this._elemenTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return templateCard;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', this._toggleButonLike);
        this._element.querySelector('.element__delete').addEventListener('click', this._removeCard);
        this._element.querySelector('.element__photo').addEventListener('click', this._openElementImage);
    }

    _toggleButonLike = () => {
        this._likeButton.classList.toggle('element__button_active');
    }

    _removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    _openElementImage = () => {
        this._openPopupImage.open(this._cardData);
    }

    _addCard = () => {
        const cardName = this._element.querySelector('.element__title');
        cardName.textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;
    }

    render() {
        this._element = this._getElemtnTemplate();
        this._likeButton = this._element.querySelector(".element__button");
        this._cardImage = this._element.querySelector('.element__photo');
        this._setEventListeners();
        this._addCard();
        return this._element;
    }
}