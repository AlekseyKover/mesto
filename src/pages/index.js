import "./index.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo}  from "../components/UserInfo.js";
import {Section}  from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {validationConfig, initialCards } from "../components/utils/constants.js";

import { buttonOpenProfilePopup,
   popupFormProfile,
   popupOpenButtonElementAdd,
  popupAddForm,jobElement,
   popupName} from '../components/utils/elements.js';





const createCard = (item) => {
  return new Card(item, 'template', opneImage).render();


}
export const opneImage = new PopupWithImage('.popup_image');
opneImage.setEventListeners();

 const userprofile = new UserInfo({
  username: '.profile__name',
  userjob: '.profile__profession'
});

const sections = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    sections.addItem(card);
  }
}, '.elements');
sections.renderItems();

const openProfilePopup = new PopupWithForm({
  submitform: (addData) => {
    userprofile.setUserInfo({
      username: addData.username,
      userjob: addData.userjob
    });
  openProfilePopup.close();
  }
}, '.popup_edit');


openProfilePopup.setEventListeners();

buttonOpenProfilePopup.addEventListener('click', function () {
  openProfilePopup.open();
  const userInfo = userprofile.getUserInfo();
  popupName.setAttribute('value', userInfo.username);
  jobElement.setAttribute('value', userInfo.userjob);
})


const addPopupCard = new PopupWithForm({
  submitform: (addData) => {
    sections.addItem(createCard({
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









