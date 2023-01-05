import Card from "./Card.js";
import {initialCards} from "./cards.js";
import FormValidator from "./FormValidator.js";
const popupElementProfile = document.querySelector('.popup_edit');
const popupCloseButtonProfile = popupElementProfile.querySelector('.popup__close_edit');
const buttonOpenProfilePopup = document.querySelector('.profile__button-edit');
const popupFormProfile = document.querySelector('.popup__form');
const popupAddCard = document.querySelector('.popup_add');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');
const popupCloseElemetnAdd = document.querySelector('.popup__close_add');
const popupImageItem = document.querySelector('.popup_image');
const popupImageClose = popupImageItem.querySelector('.popup__image-close');
const popupImageText = popupImageItem.querySelector('.popup__text');
const popupImageImage = popupImageItem.querySelector('.popup__image');
/*const cardTemplate = document.querySelector('.template').content;*/
const cardsContainer = document.querySelector('.elements');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const buttonPopupAddForm = popupAddForm.querySelector('.popup__button_add');
const popupAddElementFormName = popupAddCard.querySelector('.popup__input_item_text');
const popupAddElementFormLink = popupAddCard.querySelector('.popup__input_item_link');
const jobElement = popupElementProfile.querySelector('.popup__input_item_profession');
const popupName = popupElementProfile.querySelector('.popup__input_item_name');
const nameElementProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
/*const templateCard = cardTemplate.querySelector('.element');*/
const allPopups = document.querySelectorAll('.popup');
/*const inputItem = document.querySelector('.popup__input-error_active');*/



const createCard = (cardData) => {
  return new Card(cardData, 'template', openItemImage).render();
}
/*  const card = templateCard.cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardTrash = card.querySelector('.element__delete');
  const cardLike = card.querySelector('.element__button');
  const cardImage = card.querySelector('.element__photo');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', () => {
    openItemImage(cardData);
  });

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('element__button_active');
  });

  cardTrash.addEventListener('click', () => {
    card.remove();
  });
  return card
}*/

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressEsc);
}
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressEsc);
}

const openProfilePopup = function () {
  popupName.value = nameElementProfile.textContent;
  jobElement.value = professionProfile.textContent;
  openPopup(popupElementProfile);

}
const openItemImage = (cardData) => {
  popupImageText.textContent = cardData.name;
  popupImageImage.src = cardData.link;
  popupImageImage.alt = cardData.name;
  openPopup(popupImageItem);
}

const renderCard = function (cardData) {
  cardsContainer.prepend(createCard(cardData));
}

initialCards.forEach(renderCard);
 


const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = {
    name: popupAddElementFormName.value,
    link: popupAddElementFormLink.value
  };
  
  renderCard(cardData);
  popupAddForm.reset();
  closePopup(popupAddCard);
  turnOffButtom(buttonPopupAddForm, validationConfig);
}

const turnOffButtom = (buttonElement, validationConfig) => {
	buttonElement.setAttribute("disabled", true);
	buttonElement.classList.add(validationConfig.inactiveButtonClass);
}
const closePopupPressEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameElementProfile.textContent = popupName.value;
  professionProfile.textContent = jobElement.value;
  closePopup(popupElementProfile);
}

allPopups.forEach(item => {
  item.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(item);
    }
  })
})

buttonOpenProfilePopup.addEventListener('click', () => {
  openProfilePopup();

});

popupCloseButtonProfile.addEventListener('click', () => {
  closePopup(popupElementProfile);
});
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonElementAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupAddForm.reset();
  turnOffButtom(buttonPopupAddForm, validationConfig);
})

popupCloseElemetnAdd.addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupAddForm.addEventListener('submit', handleCardFormSubmit);

popupImageClose.addEventListener('click', () => {
  closePopup(popupImageItem);
})







const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  sectionSelector: '.popup__section',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: '.popup__input-error'
}

const validationConfigAdd = new FormValidator(validationConfig, popupAddForm);
const validationConfigEdit = new FormValidator(validationConfig, popupFormProfile);
validationConfigAdd.enableValidation();
validationConfigEdit.enableValidation();









