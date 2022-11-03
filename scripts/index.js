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
let jobElement = popupElement.querySelector('.popup__input_item_profession');
let popupName = popupElement.querySelector('.popup__input_item_name');
let nameElementProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');
console.log(buttonLikeElement);
/* Open/Close popup*/



const openPopupElement = function (popup) {
  popup.classList.add('popup_opened');
}
const closePopupCloseElemetnAdd = () => {
  popupOpenElementAdd.classList.remove('popup_opened');
}

const openPopup = function (popup) {
  popup.classList.toggle('popup_opened');
  popupName.value = nameElementProfile.textContent;
  jobElement.value = professionProfile.textContent;

}
const closePopup = function (item) {
  item.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (popupName.value !== '') {
    nameElementProfile.textContent = popupName.value;
    professionProfile.textContent = jobElement.value;
    closePopup();
  }

}
popupOpenButtonElement.addEventListener('click',  () => {
  openPopupElement(popupElement)
}
);
popupCloseButtonElement.addEventListener('click', () =>{
  closePopup(popupElement)
});
popupElement.addEventListener('submit', formSubmitHandler);

popupOpenButtonElementAdd.addEventListener('click', () => {
  openPopupElement(popupOpenElementAdd)
});
popupCloseElemetnAdd.addEventListener('click', closePopupCloseElemetnAdd);

popupImageClose.addEventListener('click', () =>{
  closePopup(popupImageItem)
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
  const itemLink = itemElement.querySelector('.element__photo');
  const itemLike = itemElement.querySelector('.element__button');
  const itemImage = itemElement.querySelector('.element__photo');
  itemName.textContent = element.name;
  itemLink.src = element.link;
  containerItem.prepend(itemElement);

  itemImage.addEventListener('click', () => {
    openItemImage(element);
  });

  itemLike.addEventListener('click', () => {
    itemLike.classList.toggle('element__button_active');
  });

}


const openItemImage = (element) => {
  popupImageText.textContent = element.name;
  popupImageImage.src = element.link;
  openPopup(popupImageItem);
}





initialCards.forEach(function (element) {
  getItemRender(element)
});


















