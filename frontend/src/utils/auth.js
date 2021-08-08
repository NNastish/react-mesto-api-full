
export const BASE_URL = 'https://api.nastish.nomoredomains.monster';

const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);

export const register = (registration) => {
    const {email, password} = registration;
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password, "email": email})
    })
        .then(handleResponse)
};

export const login = (loginInfo) => {
    const {email, password} = loginInfo;
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password, "email": email})
    })
        .then(handleResponse)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(handleResponse)
}
