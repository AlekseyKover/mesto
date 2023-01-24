export class Api {
    constructor(config) {
        this._url = config.url
        this._headers = config.headers

    }

    _checkRes(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getAllCards() {
        return fetch(this._url + "cards/", {
            headers: this_headers
        })
            .then(res => this._checkRes(res))
    }

}