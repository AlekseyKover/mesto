export  class Section {
    constructor ({items,renderer}, elements) {
        this._selector = document.querySelector(elements);
        this._itemsRender = items;
        this._renderer = renderer;
    }
    renderItems () {
        this._itemsRender.forEach((item)=>this._renderer(item))
    }
    addItem (itemHtml){
        this._selector.prepend(itemHtml)
    }
}