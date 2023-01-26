import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationConfig } from "../utils/constants";
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import {
  buttonOpenProfilePopup,
  popupFormProfile,
  popupOpenButtonElementAdd,
  popupAddForm, jobElement,
  popupName
} from '../utils/elements.js';
let userId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57/",
  headers: {
    authorization: "51b0f5f8-3da0-4522-9b83-fa3cf173d796",
    "Content-Type": "application/json"
  }
})

Promise.all([api.getAllCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userProfile.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



const popupWithSubmit = new PopupWithSubmit('.popup_delete');

const deleteCard = (id, removeCardHandler) => {
  api.deleteCard(id)
    .then(res => {
      popupWithSubmit.close()
      removeCardHandler();
      return res;
    })
}

const addLike = (likeElement, cardId) => {
  api.like(cardId)
    .then(res => {
      likeElement.textContent = res.likes.length;
    })
}

const deleteLike = (likeElement, cardId) => {
  api.dislike(cardId)
    .then(res => {
      likeElement.textContent = res.like.length;
    })
}

/*const createCard = (data) => {
  return new Card(data, 'template', openImage, popupWithSubmit, userProfile.getUserOwner(), addLike, deleteLike, deleteCard).render();
}*/

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: 'template',
    userId: userId,
    handleCardClick: (name, link) => {
      openImage.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      popupWithSubmit.open();
      popupWithSubmit.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupWithSubmit.close();
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
  userjob: '.profile__profession'
});

const section = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');








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
























