import {
    FORM,
    FIRST_NAME_INPUT,
    SURNAME_INPUT,
    ADDRESS_INPUT,
    AGE_INPUT,
    SUBMIT_BUTTON,
} from "../constants/global.js";

// Функция отчистки формы и установка disabled для кнопки формы.
FORM.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        firstName: FIRST_NAME_INPUT.value.trim(),
        surname: SURNAME_INPUT.value.trim(),
        address: ADDRESS_INPUT.value.trim(),
        age: AGE_INPUT.value.trim(),
    };

    try {
        if (STATE.editingStudentId) {
            await updateStudentData(STATE.editingStudentId, payload);
        } else {
            await addStudentAPI(payload);
        }

        FORM.reset();
        STATE.editingStudentId = null;
        FORM.querySelector("button").textContent = "Добавить студента";

        await loadJSON();
    } catch (err) {
        console.error("Ошибка при сохранении:", err);
    }
});
