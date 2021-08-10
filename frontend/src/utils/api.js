
class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(this._getResponseData);
    }

    getUserInfo() {
        const query = `${this._baseUrl}/users/me`;
        return fetch(query, {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(this._getResponseData);
    }

    editProfileInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(this._getResponseData);
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(this._getResponseData);
    }

    editAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._getResponseData);
    }

    addLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }

    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }

    changeLikeCardStatus(id, action) {
        if (action === true) {
            return this.addLike(id);
        } else {
            return this.deleteLike(id);
        }
    }

    deleteCard(_id) {
        return fetch(this._baseUrl + '/cards/' + _id, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }
}

export const api = new Api({
    baseUrl: 'https://api.nastish.nomoredomains.monster',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});


