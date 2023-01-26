/*export class Card {
    constructor(card, template, popupImage, popupWithSubmit, owner, like, dislike, deleteCard) {
        this._cardData = card;
        this._elemenTemplate = template;
        this._openPopupImage = popupImage;
        this._popupWithSubmit = popupWithSubmit;
        this._userOwner = owner;
        this._cardOwner = card.owner._id
        this._deleteCardServer = deleteCard;
        this._deleteCard = deleteCard.bind(this);
        this._like = like;
        this._dislike = dislike;


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
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__button_active')) {
                this._dislike();
            } else {
                this._like();
            }
        });
        this._cardDelete.addEventListener('click', () => {
            this._deleteCard(this._cardOwner);
        });
        this._cardImage.addEventListener('click', () => { this._popupWithSubmit.open(this._deleteCard) });
    }
    /*
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



    isOwner() {
        if (this._cardData._id !== this._ownerId) {
            this._cardDelete.remove();
            this._cardDelete = null;
        }
    }

    _checkLike() {
        const isLiked = this._cardDetails.likes.some((item) => {
            return item._id === this._userOwner
        })
        if (isLiked) {
            this._likeButton.classList.add('element__button_active');
        }
    }

    _handleLikeCLick() {
        this._likeButton.classList.toggle('element__button_active');

    }
    setLikesCount(res) {
        this._cardLikesNumber.textContent = `${res.likes.length}`;
    }

    deleteCard() {
        this._deleteCardServer(this._cardData._id, this._removeCard)

    }

    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeBtn.classList.toggle('element__button_active');
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
        this._cardDelete = this._element.querySelector('.element__delete');
        this._cardLikesNumber = this._element.querySelector('.elmenet__likes-number');

        this._setEventListeners();
        this._addCard();
        return this._element;
    }
*/

export class Card {
    constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
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

    // Получаем шаблон карточки
    _getTemplate() {
        this._card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return this._card;
    }

    // Удаление карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    // Устанавливаем слушатели на карточку
    _setEventListeners() {
        // открытие попапа просмотра изображения кликом по изображению
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
        // слушатель кнопки удаления карточки
        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteIconClick(this._cardId);
        })
        // слушатель кнопки лайк
        this._likeBtn.addEventListener('click', () => {
            if (this._likeBtn.classList.contains('element__button')) {
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        })
    }

    // Генерируем готовую карточку
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

    // Проверка, стоит ли лайк на карточке
    _isCardLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._likeBtn.classList.add('element__button_active');
        }
    }

    // поставить/удалить лайк, изменение количества лайков
    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeBtn.classList.toggle('element__button_active');
    }

    // проверяем владельца карточки и убираем кнопку Delete
    _hasDeleteBtn() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteBtn.remove();
        }
    }
}