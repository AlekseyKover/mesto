
export class Card {
    constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._userId = userId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._likes = data.likes;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
    }


    _getTemplate() {
        this._card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return this._card;
    }


    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })

        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteIconClick(this._cardId);
        })

        this._likeBtn.addEventListener('click', () => {
            if (this._likeBtn.classList.contains('element__button_active')) {
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        })
    }


    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__photo');
        this._likeBtn = this._element.querySelector('.element__button');
        this._likesNumber = this._element.querySelector('.elmenet__likes-number');
        this._deleteBtn = this._element.querySelector('.element__delete');

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._hasDeleteBtn();
        this._isCardLiked();
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();

        return this._element;
    }


    _isCardLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._likeBtn.classList.add('element__button_active');
        }
    }


    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeBtn.classList.toggle('element__button_active');
    }


    _hasDeleteBtn() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteBtn.remove();
        }
    }
}