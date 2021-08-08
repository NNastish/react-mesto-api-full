const initialCards = [
    {
        name: "New York",
        link: "https://images.unsplash.com/photo-1603793516210-5cf879f819af?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMGNpdHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Camp",
        link: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmlnaHQlMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Bali",
        link: "https://images.unsplash.com/photo-1536152470836-b943b246224c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJhbGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Chill & Ride",
        link: "https://images.unsplash.com/photo-1465697558515-acefe0316e17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN1cmZpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Clouds don't matter",
        link: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const object = {
    formSelector: ".form", //див с формой
    inputSelector: ".form__input", //поле ввода
    submitButtonSelector: ".form__button", //кнопка
    inactiveButtonClass: "form__button_disabled", //кнопка_неактивна
    inputErrorClass: "form__input_type_error", //спан с ошибкой
    errorClass: "form__input-error_visible", //свойство, меняющее видимость спана
};

export { initialCards, object }
