import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationConfig } from "../utils/constants";
import Api from '../components/Api.js'
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import {
  buttonOpenProfilePopup,
  popupFormProfile,
  popupOpenButtonElementAdd,
  popupAddForm, jobElement,
  popupName, openAvatar, formPopupAvatar
} from '../utils/elements.js';


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "51b0f5f8-3da0-4522-9b83-fa3cf173d796",
    "Content-Type": "application/json"
  }
})
let userId;
Promise.all([api.getAllCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userProfile.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



const deleteCardPopup = new PopupWithSubmit('.popup_delete');
deleteCardPopup.setEventListeners();
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: 'template',
    userId: userId,
    handleCardClick: (cardData) => {
      openImage.open(cardData);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.like(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.dislike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};


const openImage = new PopupWithImage('.popup_image');
openImage.setEventListeners();

const userProfile = new UserInfo({
  username: '.profile__name',
  userjob: '.profile__profession',
  avatar: '.profile__avatar'
});

const section = new Section({
  renderer: (card) => {
    section.addItem(createCard(card));
  },
}, '.elements');


const openProfilePopup = new PopupWithForm({
  submitForm: (addData) => {
    openProfilePopup.loading(true);
    api.setUserIfo(addData)
      .then((addData) => {
        userProfile.setUserInfo(addData);
        openProfilePopup.close();
      })
      .finally(() => {
        openProfilePopup.loading(false);
      });
  }
}, '.popup_edit');
openProfilePopup.setEventListeners();


const addPopupCard = new PopupWithForm({
  submitForm: (addData) => {
    addPopupCard.loading(true);
    api.addNewCard(addData)
      .then((addData) => {
        section.addItem(createCard(addData));
        addPopupCard.close();
      })
      .finally(() => {
        addPopupCard.loading(false);
      });
  }
}, '.popup_add');
addPopupCard.setEventListeners();


const editAvatar = new PopupWithForm({
  submitForm: (addData) => {
    editAvatar.loading(true);
    api.setUserAvatar(addData)
      .then((addData) => {
        avatar.src = addData.avatar;
        editAvatar.close();
      })
      .finally(() => {
        editAvatar.loading(false);
      });
  }
}, '.popup_avatar');

openAvatar.addEventListener('click', function () {
  editAvatar.open();
  validationConfigAvatar.disableButton();

})
editAvatar.setEventListeners();

buttonOpenProfilePopup.addEventListener('click', function () {
  openProfilePopup.open();
  const userInfo = userProfile.getUserInfo();
  popupName.setAttribute('value', userInfo.username);
  jobElement.setAttribute('value', userInfo.userjob);
})



popupOpenButtonElementAdd.addEventListener('click', function () {
  validationConfigAdd.disableButton();
  addPopupCard.open();

})

const validationConfigAdd = new FormValidator(validationConfig, popupAddForm);
const validationConfigEdit = new FormValidator(validationConfig, popupFormProfile);
const validationConfigAvatar = new FormValidator(validationConfig, formPopupAvatar);
validationConfigAvatar.enableValidation();
validationConfigAdd.enableValidation();
validationConfigEdit.enableValidation();
























