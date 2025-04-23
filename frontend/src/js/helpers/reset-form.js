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

// Добавляем обработчик события на отправку формы

FORM.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Собираем данные
    const payload = {
        firstName: FIRST_NAME_INPUT.value.trim(),
        surname: SURNAME_INPUT.value.trim(),
        address: ADDRESS_INPUT.value.trim(),
        age: AGE_INPUT.value.trim(),
    };

    try {
        if (STATE.editingStudentId) {
            // PUT — обновляем
            await updateStudentData(STATE.editingStudentId, payload);
        } else {
            // POST — добавляем
            await addStudentAPI(payload);
        }

        // Сброс формы и состояния
        FORM.reset();
        STATE.editingStudentId = null;
        FORM.querySelector("button").textContent = "Добавить студента";

        // Обновляем таблицу
        await loadJSON();
    } catch (err) {
        console.error("Ошибка при сохранении:", err);
    }
});
