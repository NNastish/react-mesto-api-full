import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onClickClose, onClose, onUpdateUser, submitButton }) {
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name={"edit"}
            buttonTitle={submitButton}
            formTitle={"Редактировать профиль"}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            onClickClose={onClickClose}
        >

            <input className="form__input form__input_name" id="name" type="text"
                name="name" value={name || ''} onChange={handleNameChange}
                placeholder="Имя" minLength="2" maxLength="40" required/>
            <span className="form__input-error" id="name-error"></span>

            <input className="form__input form__input_about" id="about" type="text"
                   name="about" value={description || ''} onChange={handleDescriptionChange}
                   placeholder="О себе" minLength="2" maxLength="200" required/>
            <span className="form__input-error" id="about-error"></span>

        </PopupWithForm>
    );
}

export default EditProfilePopup;