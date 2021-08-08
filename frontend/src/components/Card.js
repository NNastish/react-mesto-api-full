import { useContext } from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`card__delete ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);


    const handleCardClick = () => {
        onClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <article className="card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="card__photo" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="card__lists">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-box">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-numb">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
