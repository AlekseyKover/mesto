const popupElement = document.querySelector('.popup');
const saveButton = popupElement.querySelector('.popup__button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
let jobElement = popupElement.querySelector('.popup__input_item_profession');
let popupName = popupElement.querySelector('.popup__input_item_name');
let nameElementProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');


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
    if (popupName.value !== '') {
        nameElementProfile.textContent = popupName.value;
        professionProfile.textContent = jobElement.value;
        closePopup();
    }

}
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('submit', formSubmitHandler);
