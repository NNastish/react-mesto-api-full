import PopupWithForm from "./PopupWithForm";
import { useState } from "react";


function AddPlacePopup({ isOpen, onClickClose, onClose, onAddPlace, submitButton }) {

    const [inputTitle, setInputTitle] = useState({value: ''});
    const [inputLink, setInputLink] = useState({value: ''});

    function handleAddPlaceSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: inputTitle.value,
            link: inputLink.value
        })
        setInputTitle({value: ''});
        setInputLink({value: ''});
    }

    const handleInputTitleChange = (event) => {
        setInputTitle({ value: event.target.value });
    }

    const handleInputLinkChange = (event) => {
        setInputLink({ value: event.target.value });
    }

    return (
        <PopupWithForm
            name={"add"}
            buttonTitle={submitButton}
            formTitle={"Новое место"}
            isOpen={isOpen}
            onClose={onClose}
            onClickClose={onClickClose}
            onSubmit={handleAddPlaceSubmit}
        >

            <input className="form__input form__input_title" id="input-title"
                   type="text" name="name" value={inputTitle.value}
                   onChange={handleInputTitleChange}
                   placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="form__input-error" id="input-title-error"></span>

            <input className="form__input form__input_link" id="input-link"
                   type="url" name="link" value={inputLink.value}
                   onChange={handleInputLinkChange}
                   placeholder="Ссылка на картинку" required/>
            <span className="form__input-error" id="input-link-error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;