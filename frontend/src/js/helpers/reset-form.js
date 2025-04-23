import {
    FORM,
    FIRST_NAME_INPUT,
    SURNAME_INPUT,
    ADDRESS_INPUT,
    AGE_INPUT,
    SUBMIT_BUTTON,
} from "../constants/global.js";

// Функция отчистки формы и установка disabled для кнопки формы
export const resetForm = () => {
    FORM.reset();
    SUBMIT_BUTTON.disabled = true;
    FORM.addEventListener("input", () => {
        if (
            FIRST_NAME_INPUT.value.trim() !== "" &&
            SURNAME_INPUT.value.trim() !== "" &&
            ADDRESS_INPUT.value.trim() !== "" &&
            AGE_INPUT.value.trim() !== ""
        ) {
            SUBMIT_BUTTON.disabled = false;
        } else {
            SUBMIT_BUTTON.disabled = true;
        }
    });
};
