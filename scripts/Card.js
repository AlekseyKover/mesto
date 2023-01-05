export default class Card {
    constructor(card, template, openModal) {
        this._cardData = card;
        this._elemenTemplate = template;
        this._openModal = openModal;
    }
    _getElemtnTemplate = () => {
        const templateCard = document
            .querySelector(this._elemenTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return templateCard;
    }
    _getElementsCard = () =>{
        this._element.querySelector('.element__button').addEventListener('click',this._toggleButonLike);
        this._element.querySelector('.element__delete').addEventListener('click',this._removeCard);
        this._element.querySelector('.element__photo').addEventListener('click',this._openElementImage);
    }
    _toggleButonLike = () =>{
        this._element.querySelector('.element__button').classlist.togle('element__button_active'); 
    }
    _removeCard = ()=>{
        this._element.remove();
    }
    _openElementImage = () =>{
        this._openModal(this._cardData);
    }
    _addCard = () =>{
        const cardName = this._element.querySelector('.element__title');
        const cardImage = this._element.querySelector('.element__photo');
        cardName.textContent = this._cardData.name;
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;
    }
    render(){
        this._element = this._getElemtnTemplate();
        this._getElementsCard();
        this._addCard();

    return this._element;
    }
}