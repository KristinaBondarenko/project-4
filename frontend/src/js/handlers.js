/**
 * Используется || "" при вставке значений в input, чтобы избежать undefined.
 * Добавлен try/catch для fetch при редактировании — до этого ошибки могли быть не пойманны.
 * button.closest("tr") используется один раз, код стал чище и проще.
 * Удалены лишние вложенности и повторения.
 */

import {
    FORM,
    FIRST_NAME_INPUT,
    SURNAME_INPUT,
    ADDRESS_INPUT,
    AGE_INPUT,
    STATE,
    TABLE_BODY,
} from "./constants/global.js";
import { deleteStudentAPI } from "./api/api.js";

// Обработчик кликов по таблице студентов.
TABLE_BODY.addEventListener("click", async (e) => {
    const button = e.target;
    const row = button.closest("tr"); // Получаем строку таблицы (tr), в которой кликнули.
    if (!row) return;

    const studentId = row.dataset.id; // Получаем ID студента из data-атрибута.
    const isDelete = button.classList.contains("delete-btn");
    const isEdit = button.classList.contains("edit-btn");

    // Удаление студента.
    if (isDelete) {
        try {
            await deleteStudentAPI(studentId); // Удаляем с сервера.
            row.remove(); // Удаляем строку из таблицы.
        } catch (error) {
            console.error("Не удалось удалить студента:", error);
        }
        return; // Прерываем выполнение, если был клик по кнопке удаления.
    }

    // Редактирование студента.
    if (isEdit) {
        try {
            const response = await fetch(
                `http://localhost:3000/students/${studentId}`,
            );
            if (!response.ok) throw new Error("Ошибка загрузки данных");

            const student = await response.json();

            // Заполняем форму значениями студента.
            FIRST_NAME_INPUT.value = student.firstName || "";
            SURNAME_INPUT.value = student.surname || "";
            ADDRESS_INPUT.value = student.address || "";
            AGE_INPUT.value = student.age || "";

            // Сохраняем ID редактируемого студента в состояние.
            STATE.editingStudentId = studentId;

            // Меняем текст кнопки формы на "Сохранить изменения".
            FORM.querySelector("button").textContent = "Сохранить изменения";
        } catch (error) {
            console.error("Не удалось загрузить данные студента:", error);
        }
    }
});
