import logo from "../images/logo.svg";
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'


function Header({ userData, setLoggedIn }) {
    const location = useLocation();
    const [info, setInfo] = useState({
        buttonName: '',
        buttonLink: ''
    })
    const [email, setEmail] = useState('');

    const handleLocation = () => {
        const pathName = location.pathname;
        const chunks = pathName.split('/');
        const endPoint = chunks[chunks.length - 1];
        if (endPoint === 'sign-in') {
            setInfo({
                buttonName: 'Регистрация',
                buttonLink: '/sign-up'
            })
            setEmail('')
        } else if (endPoint === 'sign-up') {
            setInfo({
                buttonName: 'Войти',
                buttonLink: '/sign-in'
            })
            setEmail('')
        } else {
            setInfo({
                buttonName: 'Выйти',
                buttonLink: '/sign-in'
            })
            setEmail(userData);
        }
    }

    const handleExit = () => {
        if (info.buttonName === 'Выйти') {
            localStorage.removeItem('jwt');
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        handleLocation();
    }, [location])

    return (
        <header className="header">
            <a href="#" target="_self" className="header__link"><img src={logo} alt="Логотип"
                                                                     className="header__logo"/></a>
            <div className="header__nav">
                <p className="header__mail">{email}</p>
                <Link to={info.buttonLink} onClick={handleExit}
                      className="header__action">{info.buttonName}</Link>
            </div>
        </header>
    )
}

export default Header;
