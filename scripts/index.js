const popupElement = document.querySelector('.popup_edit');
const buttonLikeElement = document.querySelector('.element__button');
const saveButton = popupElement.querySelector('.popup__button_edit');

const popupCloseButtonElement = popupElement.querySelector('.popup__close_edit');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const popupOpenElementAdd = document.querySelector('.popup_add');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');
const popupCloseElemetnAdd = document.querySelector('.popup__close_add');
const popupImageItem = document.querySelector('.popup_image');
const popupImageClose = popupImageItem.querySelector('.popup__image-close');
const popupImageText = popupImageItem.querySelector('.popup__text');
const popupImageImage = popupImageItem.querySelector('.popup__image');
const itemTemplate = document.querySelector('.template').content;
const containerItem = document.querySelector('.elements');
const saveButtonAdd = popupOpenElementAdd.querySelector('.popup__button_add');
const formButtonAdd = popupOpenElementAdd.querySelector('.popup__content');
let popupAddElementFormName = popupOpenElementAdd.querySelector('.popup__input_item_text');
let popupAddElementFormLink = popupOpenElementAdd.querySelector('.popup__input_item_link');
let jobElement = popupElement.querySelector('.popup__input_item_profession');
let popupName = popupElement.querySelector('.popup__input_item_name');
let nameElementProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');





const openPopupElement = function (popup) {
  popup.classList.add('popup_opened');
}
const closePopupCloseElemetnAdd = function (popup) {
  popup.classList.remove('popup_opened');
}

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  popupName.value = nameElementProfile.textContent;
  jobElement.value = professionProfile.textContent;

}
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}



function formSubmitHandler(evt) {
  evt.preventDefault();
  nameElementProfile.textContent = popupName.value;
  professionProfile.textContent = jobElement.value;
  closePopup();


}
popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupElement)
}
);
popupCloseButtonElement.addEventListener('click', () => {
  closePopup(popupElement)
});
popupElement.addEventListener('submit', formSubmitHandler);

popupOpenButtonElementAdd.addEventListener('click', () => {
  openPopupElement(popupOpenElementAdd)
});

popupCloseElemetnAdd.addEventListener('click', () => {
  closePopupCloseElemetnAdd(popupOpenElementAdd);
});





popupImageClose.addEventListener('click', () => {
  closePopupCloseElemetnAdd(popupImageItem)
})


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const getItemRender = (element) => {

  const itemElement = itemTemplate.querySelector('.element').cloneNode(true);
  const itemName = itemElement.querySelector('.element__title');
  const itemTrach = itemElement.querySelector('.element__delete');
  const itemLink = itemElement.querySelector('.element__photo');
  const itemAlt = itemElement.querySelector('.element__photo');
  const itemLike = itemElement.querySelector('.element__button');
  const itemImage = itemElement.querySelector('.element__photo');
  itemName.textContent = element.name;
  itemLink.src = element.link;
  itemAlt.alt = element.name;

  itemImage.addEventListener('click', () => {
    openItemImage(element);
  });

  itemLike.addEventListener('click', () => {
    itemLike.classList.toggle('element__button_active');
  });

  itemTrach.addEventListener('click', () => {
    itemElement.remove();
  });
  return itemElement;
}




const openItemImage = (element) => {
  popupImageText.textContent = element.name;
  popupImageImage.src = element.link;
  openPopupElement(popupImageItem);
}


const addCards = function (evt) {
  evt.preventDefault();
  const itemAdd = {
    name: popupAddElementFormName.value,
    link: popupAddElementFormLink.value

  };
  getRender(itemAdd);
  closePopupCloseElemetnAdd(popupOpenElementAdd);
}

formButtonAdd.addEventListener('submit', addCards);

const getRender = function (element) {
  containerItem.prepend(getItemRender(element));
}

initialCards.forEach(function (element) {
  getRender(element)
});




















