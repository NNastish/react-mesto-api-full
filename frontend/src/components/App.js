import {useEffect, useState} from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import {api} from '../utils/api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import * as auth from '../utils/auth';
import InfoToolTip from "./InfoToolTip";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [popupSubmitSaveButton, setPopupSubmitSaveButton] = useState('Сохранить');
    const [popupSubmitCreateButton, setPopupSubmitCreateButton] = useState('Создать');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState('');
    const [infoToolTipData, setInfoToolTipData] = useState({
        status: false,
        isOpen: false
    });

    const history = useHistory();

    useEffect(() => {
        tokenCheck();
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(answer => {
                setCurrentUser(answer[0]);
                const cardsAnswer = answer[1];
                reverseArray(cardsAnswer);
                setCards(cardsAnswer);
            })
            .catch(error => {
                showError(error);
                setCurrentUser({});
            })
    }, []);


    function reverseArray(array) {
        let temp;
        const tail = array.length - 1;
        for (let i = 0; i < tail / 2; i++) {
            temp = array[i];
            array[i] = array[tail - i];
            array[tail - i] = temp;
        }
    }

    function promoteLogging(response) {
        if (response) {
            setLoggedIn(true);
            setUserData(response.email);
            history.push('/');
        }
    }

    async function tokenCheck() {
        try {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                const res = await auth.getContent(jwt);
                promoteLogging(res);
            }
        } catch (e) {
            showError(e);
        }
    }

    function handleRegister(registration) {
        auth.register(registration)
            .then(data => {
                setInfoToolTipData({
                    status: true,
                    isOpen: true
                })
                history.push('/sign-in');
            })
            .catch(err => {
                showError(err)
                setInfoToolTipData({
                    status: false,
                    isOpen: true
                })
            })
    }

    function handleLogin(login) {
        auth.login(login)
            .then(data => {
                if (data) {
                    localStorage.setItem('jwt', data.token);
                    setUserData(login.email)
                    setLoggedIn(true);
                    setCurrentUser({
                        name: data.name,
                        about: data.about,
                        avatar: data.avatar,
                        _id: data._id
                    })
                    history.push('/');
                }
            })
            .catch(err => {
                showError(err);
                setInfoToolTipData({
                    status: false,
                    isOpen: true,
                })
            })
    }



    async function handleCardLike(card) {
        try {
            const isLiked = card.likes.some(i => i === currentUser._id);
            const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        } catch (e) {
            showError(e);
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(data => {
                const refreshedCards = cards.filter(everyCard => everyCard._id !== card._id);
                setCards(refreshedCards);
            })
            .catch(showError);
    }


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);

        setSelectedCard(null);
        setInfoToolTipData(false);
    }


    const closeViaClick = (e) => {
        if (e.target.classList.contains("popup_opened")) {
            closeAllPopups();
        }
    }



    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        window.addEventListener("keydown", handleEscClose);
        return () => {
            window.removeEventListener("keydown", handleEscClose);
        }
    })

    function renderLoading(description) {
        const { flag, popup } = description;
        if (popup === 'profile') {
            flag ? setPopupSubmitSaveButton('Сохранение...') : setPopupSubmitSaveButton('Сохранить');
        } else {
            flag ? setPopupSubmitCreateButton('Создание...') : setPopupSubmitCreateButton('Создать');
        }
    }

    function showError(error) {
        console.error('Error: ' + error);
    }

    function handleUpdateUser(formData) {
        renderLoading({flag: true, popup: 'profile'});
        api.editProfileInfo(formData)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({flag: false, popup: 'profile'});
            })
    }

    function handleUpdateAvatar(avatar) {
        renderLoading({ flag: true, popup: 'avatar'});
        api.editAvatar(avatar)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({ flag: false, popup: 'avatar'});
            })
    }

    function handleAddPlace(card) {
        renderLoading({ flag: true, popup: 'addPlace'});
        api.addCard(card)
            .then(newCard => {
                // setCards([card, ...cards]);
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({ flag: false, popup: 'addPlace' });
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="container">

                <div className="page">
                    {/*шапка с логотипом */}
                    <Header userData={userData} setLoggedIn={setLoggedIn}/>

                    <Switch>
                        <ProtectedRoute
                            exact path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={setSelectedCard}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin} tokenCheck={tokenCheck}/>
                        </Route>
                        <Route path="/sign-up">
                            <Register handleRegister={handleRegister}/>
                        </Route>
                        <ProtectedRoute
                            path="*"
                            component={PageNotFound}
                        />
                    </Switch>

                    {/*popup добавления новой карточки профиля*/}
                    <InfoToolTip
                        isOpen={infoToolTipData.isOpen}
                        isConfirmed={infoToolTipData.status}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                        onAddPlace={handleAddPlace}
                        submitButton={popupSubmitCreateButton}
                    />

                    {/*popup редактирования профиля*/}

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                        onUpdateUser={handleUpdateUser}
                        submitButton={popupSubmitSaveButton}
                    />

                    {/*popup добавления нового аватара*/}

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClickClose={closeViaClick}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        submitButton={popupSubmitCreateButton}
                    />

                    {/*popup для увеличения фото*/}

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                    />

                    {/*popup для подтверждения удаления карточки*/}
                    {/*TODO: check after card realisation*/}
                    <PopupWithForm
                        name={"delete"}
                        buttonTitle={"Да"}
                        formTitle={"Вы уверены?"}
                        isOpen={false}
                    />

                    {/*футер */}
                    <Footer/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

