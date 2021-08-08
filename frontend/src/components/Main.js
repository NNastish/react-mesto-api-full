import { useContext } from "react";
import Card from './Card';
import Profile from './Profile';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({ onAddPlace, onEditAvatar, onEditProfile, onCardClick, cards, onCardDelete, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);



    return (
        <>
            {/*секция с профилем*/}
            <Profile
                userAvatar={currentUser.avatar}
                onEditAvatar={onEditAvatar}
                userName={currentUser.name}
                onEditProfile={onEditProfile}
                userDescription={currentUser.about}
                onAddPlace={onAddPlace}
            />


            {/*секция с основным массивом карточек */}
            <section className="cards">
                {
                    cards.map((card) => (
                        <Card key={card._id} card={card} onClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    ))
                }
            </section>
        </>
    )
}

export default Main;
