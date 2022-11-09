const popupElementProfile = document.querySelector('.popup_edit');
const popupCloseButtonProfile = popupElementProfile.querySelector('.popup__close_edit');
const saveButtonProfile = document.querySelector('.popup__button_edit');
const openPopupProfileButton = document.querySelector('.profile__button-edit');
const popupFormProfile = document.querySelector('.popup__content');
const popupOpenElementAdd = document.querySelector('.popup_add');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');
const popupCloseElemetnAdd = document.querySelector('.popup__close_add');
const popupImageItem = document.querySelector('.popup_image');
const popupImageClose = popupImageItem.querySelector('.popup__image-close');
const popupImageText = popupImageItem.querySelector('.popup__text');
const popupImageImage = popupImageItem.querySelector('.popup__image');
const cardTemplate = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements');
const saveButtonAdd = popupOpenElementAdd.querySelector('.popup__button_add');
const popupAddForm = popupOpenElementAdd.querySelector('.popup__content');
const popupAddElementFormName = popupOpenElementAdd.querySelector('.popup__input_item_text');
const popupAddElementFormLink = popupOpenElementAdd.querySelector('.popup__input_item_link');
const jobElement = popupElementProfile.querySelector('.popup__input_item_profession');
const popupName = popupElementProfile.querySelector('.popup__input_item_name');
const nameElementProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');


const createCard = (cardData) => {
  const templateCard = cardTemplate.querySelector('.element').cloneNode(true);
  const cardName = templateCard.querySelector('.element__title');
  const cardTrash = templateCard.querySelector('.element__delete');
  const cardLink = templateCard.querySelector('.element__photo');
  const cardAlt = templateCard.querySelector('.element__photo');
  const cardLike = templateCard.querySelector('.element__button');
  const cardImage = templateCard.querySelector('.element__photo');

  cardName.textContent = cardData.name;
  cardLink.src = cardData.link;
  cardAlt.alt = cardData.name;

  cardImage.addEventListener('click', () => {
    openItemImage(cardData);
  });

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('element__button_active');
  });

  cardTrash.addEventListener('click', () => {
    templateCard.remove();
  });
  return templateCard
}


const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

const openProfilePopup = function () {
  popupElementProfile.classList.add('popup_opened');
  popupName.value = nameElementProfile.textContent;
  jobElement.value = professionProfile.textContent;

}


const openItemImage = (cardData) => {
  popupImageText.textContent = cardData.name;
  popupImageImage.src = cardData.link;
  popupImageImage.alt = cardData.name;
  openPopup(popupImageItem);
}


const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = {
    name: popupAddElementFormName.value,
    link: popupAddElementFormLink.value

  };
  renderCard(cardData);
  popupAddForm.reset();
  closePopup(popupOpenElementAdd);
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameElementProfile.textContent = popupName.value;
  professionProfile.textContent = jobElement.value;
  closePopup(popupElementProfile);
}


const renderCard = function (cardData) {
  cardsContainer.prepend(createCard(cardData));
}


initialCards.forEach(function (cardData) {
  renderCard(cardData)
});

openPopupProfileButton.addEventListener('click', () => {
  openProfilePopup();

});


popupCloseButtonProfile.addEventListener('click', () => {
  closePopup(popupElementProfile);
});
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonElementAdd.addEventListener('click', () => {
  openPopup(popupOpenElementAdd);
});

popupCloseElemetnAdd.addEventListener('click', () => {
  closePopup(popupOpenElementAdd);
});


popupAddForm.addEventListener('submit', handleCardFormSubmit);


popupImageClose.addEventListener('click', () => {
  closePopup(popupImageItem);
})




















