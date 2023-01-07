import Card from "./Card.js";
import {initialCards} from "./cards.js";
import FormValidator from "./FormValidator.js";

const popupElementProfile = document.querySelector('.popup_edit');
const buttonOpenProfilePopup = document.querySelector('.profile__button-edit');
const popupFormProfile = document.querySelector('.popup__form');
const popupAddCard = document.querySelector('.popup_add');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');
const popupImageItem = document.querySelector('.popup_image');
const popupImageText = popupImageItem.querySelector('.popup__text');
const popupImageImage = popupImageItem.querySelector('.popup__image');
const cardsContainer = document.querySelector('.elements');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const popupAddElementFormName = popupAddCard.querySelector('.popup__input_item_text');
const popupAddElementFormLink = popupAddCard.querySelector('.popup__input_item_link');
const jobElement = popupElementProfile.querySelector('.popup__input_item_profession');
const popupName = popupElementProfile.querySelector('.popup__input_item_name');
const nameElementProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const allPopups = document.querySelectorAll('.popup');



const createCard = (cardData) => {
  return new Card(cardData, 'template', openItemImage).render();
}
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
  item.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(item)
    }
    if (event.target.classList.contains('popup__close')){
      closePopup(item)
    }
  })
})

buttonOpenProfilePopup.addEventListener('click', () => {
  openProfilePopup();
});

popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonElementAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupAddForm.reset();
  validationConfigAdd.toggleButtonState();
})

popupAddForm.addEventListener('submit', handleCardFormSubmit);

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









