import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onClickClose, onUpdateAvatar, submitButton }) {
    const inputRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });
        inputRef.current.value = '';
    }

    return (
        <PopupWithForm
            name={"avatar"}
            buttonTitle={submitButton}
            formTitle={"Обновить аватар"}
            isOpen={isOpen}
            onClose={onClose}
            onClickClose={onClickClose}
            onSubmit={handleSubmit}
        >

            <input className="form__input form__input_link" id="link"
                   ref={inputRef}
                   type="url" name="avatar" defaultValue=""
                   placeholder="Ссылка на фототографию" required/>
            <span className="form__input-error" id="link-error"></span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;