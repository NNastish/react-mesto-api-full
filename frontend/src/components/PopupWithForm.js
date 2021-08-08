function PopupWithForm(props) {
    return (
        <article
            className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}
            onMouseUp={props.onClickClose}
        >
            <div className="popup__window">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <form className="form" name={`popup-form${props.name}`} onSubmit={props.onSubmit}>
                    <h2 className="form__title">{props.formTitle}</h2>
                    {props.children}
                    <button className="form__button" type="submit">{props.buttonTitle}</button>
                </form>
            </div>
        </article>
    )
}

export default PopupWithForm;
