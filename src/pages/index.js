import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationConfig, initialCards } from "../utils/constants";
import { Api } from "../components/Api";
import {
  buttonOpenProfilePopup,
  popupFormProfile,
  popupOpenButtonElementAdd,
  popupAddForm, jobElement,
  popupName
} from '../utils/elements.js';

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57/",
  headers: {
    authorization: "51b0f5f8-3da0-4522-9b83-fa3cf173d796",
    "Content-Type": "application/json"
  }
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })
});


api.getAllcards()








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









