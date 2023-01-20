import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationConfig, initialCards } from "../utils/constants";

import {
  buttonOpenProfilePopup,
  popupFormProfile,
  popupOpenButtonElementAdd,
  popupAddForm, jobElement,
  popupName
} from '../utils/elements.js';

const createCard = (data) => {
  return new Card(data, 'template', openImage).render();
}
const openImage = new PopupWithImage('.popup_image');
openImage.setEventListeners();

const userProfile = new UserInfo({
  username: '.profile__name',
  userjob: '.profile__profession'
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  }
}, '.elements');
section.renderItems();

const openProfilePopup = new PopupWithForm({
  submitForm: (addData) => {
    userProfile.setUserInfo({
      username: addData.username,
      userjob: addData.userjob
    });
    openProfilePopup.close();
  }
}, '.popup_edit');

openProfilePopup.setEventListeners();

buttonOpenProfilePopup.addEventListener('click', function () {
  openProfilePopup.open();
  const userInfo = userProfile.getUserInfo();
  popupName.setAttribute('value', userInfo.username);
  jobElement.setAttribute('value', userInfo.userjob);
})

const addPopupCard = new PopupWithForm({
  submitForm: (addData) => {
    section.addItem(createCard({
      name: addData.namelocation,
      link: addData.namelink
    }));
    addPopupCard.close();
  }
}, '.popup_add');
addPopupCard.setEventListeners();

popupOpenButtonElementAdd.addEventListener('click', function () {
  addPopupCard.open();
  validationConfigAdd.disableButton();
})

const validationConfigAdd = new FormValidator(validationConfig, popupAddForm);
const validationConfigEdit = new FormValidator(validationConfig, popupFormProfile);

validationConfigAdd.enableValidation();
validationConfigEdit.enableValidation();









