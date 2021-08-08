import { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const {email, password} = login;
        // console.log(email, password);
        handleLogin(login);
    }

    return (
        <form onSubmit={handleSubmit} className="authorization">
            <h2 className="authorization__title">Вход</h2>
            <input className="authorization__input" name="email" onChange={handleChange} value={login.email} type="email" placeholder="Email" minLength="2"
                   required/>
            <input className="authorization__input" name="password" onChange={handleChange} value={login.password} type="password" placeholder="Пароль"
                   minLength="4" required/>
            <button className="authorization__button" type="submit">Войти</button>
        </form>
    )
}

export default Login;
