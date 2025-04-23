import {
    FORM,
    FIRST_NAME_INPUT,
    SURNAME_INPUT,
    ADDRESS_INPUT,
    AGE_INPUT,
    STATE,
    TABLE_BODY,
} from "./constants/global.js";
import { loadJSON, deleteStudentAPI, updateStudentData } from "./api/api.js";

TABLE_BODY.addEventListener("click", async (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const studentId = row.dataset.id;

    // Удаление
    if (e.target.classList.contains("delete-btn")) {
        try {
            await deleteStudentAPI(studentId);
            row.remove();
        } catch (err) {
            console.error("Не удалось удалить студента:", err);
        }
        return;
    }

    // Редактирование
    if (e.target.classList.contains("edit-btn")) {
        const response = await fetch(
            `http://localhost:3000/students/${studentId}`,
        );
        const student = await response.json();

        FIRST_NAME_INPUT.value = student.firstName;
        SURNAME_INPUT.value = student.surname;
        ADDRESS_INPUT.value = student.address;
        AGE_INPUT.value = student.age;

        STATE.editingStudentId = studentId;
        FORM.querySelector("button").textContent = "Сохранить изменения";
    }
});
