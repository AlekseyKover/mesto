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
  popupName, popupOpenElementAvatar, formPopupAvatar
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

const PopupDeletCard = new PopupWithSubmit('.popup_delete');
PopupDeletCard.setEventListeners();
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: 'template',
    userId: userId,
    handleCardClick: (cardData) => {
      popupWithImage.open(cardData);
    },
    handleDeleteIconClick: (cardId) => {
      PopupDeletCard.open();
      PopupDeletCard.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            PopupDeletCard.close();
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
  const cardElement = card.render();
  return cardElement;
};

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

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

const popupEditProfile = new PopupWithForm({
  submitForm: (addData) => {
    popupEditProfile.loading(true);
    api.setUserIfo(addData)
      .then((addData) => {
        userProfile.setUserInfo(addData);
        popupEditProfile.close();
      })
      .finally(() => {
        popupEditProfile.loading(false);
      });
  }
}, '.popup_edit');
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  submitForm: (addData) => {
    popupAddCard.loading(true);
    api.addNewCard(addData)
      .then((addData) => {
        section.addItem(createCard(addData));
        popupAddCard.close();
      })
      .finally(() => {
        popupAddCard.loading(false);
      });
  }
}, '.popup_add');
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  submitForm: (addData) => {
    popupEditAvatar.loading(true);
    api.setUserAvatar(addData)
      .then((addData) => {
        userProfile.setUserInfo(addData);
        popupEditAvatar.close();
      })
      .finally(() => {
        popupEditAvatar.loading(false);
      });
  }
}, '.popup_avatar');

popupOpenElementAvatar.addEventListener('click', function () {
  popupEditAvatar.open();
  validationConfigAvatar.disableButton();

})
popupEditAvatar.setEventListeners();

buttonOpenProfilePopup.addEventListener('click', function () {
  popupEditProfile.open();
  const userInfo = userProfile.getUserInfo();
  popupName.setAttribute('value', userInfo.username);
  jobElement.setAttribute('value', userInfo.userjob);
})

popupOpenButtonElementAdd.addEventListener('click', function () {
  validationConfigAdd.disableButton();
  popupAddCard.open();

})

const validationConfigAdd = new FormValidator(validationConfig, popupAddForm);
const validationConfigEdit = new FormValidator(validationConfig, popupFormProfile);
const validationConfigAvatar = new FormValidator(validationConfig, formPopupAvatar);
validationConfigAvatar.enableValidation();
validationConfigAdd.enableValidation();
validationConfigEdit.enableValidation();