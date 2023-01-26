export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    renderItems(data) {
        data.forEach(item => this._renderer(item));
    }

    addItem(itemHtml) {
        this._container.append(itemHtml)
    }
}