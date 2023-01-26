export default class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers

    }

    _checkRes(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._parseResponse(res));



    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }



    setUserIfo(userInfo) {
        return fetch(this._url + "users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(userInfo)
        })
            .then(res => this._checkRes(res))
    }

    addNewCard(data) {
        return fetch(this._url + "cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkRes(res))
    }

    setUserAvatar(data) {
        return fetch(this._url + "users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => this._checkRes(res))
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => this._checkRes(res))
    }

    like(id) {
        return fetch(`${this._url}/cards${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(res => this._checkRes(res))
    }

    dislike(id) {
        return fetch(`${this._url}/cards${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => this._checkRes(res))
    }
}