const InfoToolTip = ({ isOpen, isConfirmed, onClickClose, onClose }) => {
    return (
        <article className={`popup popup_type_status ${isOpen ? 'popup_opened' : ''}`}
                 onMouseUp={onClickClose}>
            <div className="popup__window">
                <form className="form">
                    <div className={`popup__picture ${isConfirmed ? 'popup__picture_good' : 'popup__picture_bad'}`}/>
                    <p className="popup__title popup__title_info">{isConfirmed ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    <button className="popup__close" type="button" onClick={onClose}/>
                </form>
            </div>

        </article>
    )
}

export default InfoToolTip;