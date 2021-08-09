import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ handleRegister }) => {
    const [registration, setRegistration] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegistration({
            ...registration,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(registration);
    }

    return (
        <form onSubmit={handleSubmit} className="authorization">
            <h2 className="authorization__title">Регистрация</h2>
            <input className="authorization__input" onChange={handleChange} value={registration.email} name="email" type="email" placeholder="Email"
                   minLength="2" required/>
            <input className="authorization__input" onChange={handleChange} value={registration.password} name="password" type="password" placeholder="Пароль"
                   minLength="4" required/>
            <button className="authorization__button" type="submit">Зарегистрироваться</button>
            <p className="authorization__text">
                Уже зарегистрированы? <Link to='/sign-in' className="authorization__link">Войти</Link>
            </p>
        </form>
    )
}

export default Register;
