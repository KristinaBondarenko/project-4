import { TABLE_BODY, STATE } from "./constants/global.js";
import { handleClickTableRow } from "./handlers.js";
import { deleteStudent } from "./api/api.js";

/**
 * Функция отрисовки данных в таблице и их очистка
 */
export function renderTable(data) {
    let html = "";

    if (data && Array.isArray(data)) {
        data.forEach((student) => {
            html += `
                <tr id=${student.id}>
                    <td>${student.firstName}</td>
                    <td>${student.surname}</td>
                    <td>${student.address}</td>
                    <td>${student.age}</td>
                    <td>
                        <button id='button-delete'>x</button>
                    </td>
                </tr>`;
        });
    }

    TABLE_BODY.innerHTML = "";
    TABLE_BODY.insertAdjacentHTML("beforeend", html);

    // обнуляем значения перед добавлением обработчиков
    STATE.clickedStudent = null;
    STATE.tableRowCheckedId = null;

    // Получение кнопок для удаления студента
    const deleteButtons = document?.querySelectorAll("#button-delete");

    deleteButtons.forEach((deleteButton) => {
        deleteButton.removeEventListener("click", deleteStudent);
        deleteButton.addEventListener("click", deleteStudent);
    });

    // получение строк таблицы для редактирования данных студента
    const tableRows = document.querySelectorAll("#studentTable tr");

    tableRows.forEach((tableRow) => {
        tableRow.removeEventListener("click", (event) => {
            handleClickTableRow(event, data);
        });
        tableRow.addEventListener("click", (event) => {
            if (event.target.tagName !== "BUTTON") {
                handleClickTableRow(event, data);
            }
        });
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const studentId = row.id;
            const cells = row.querySelectorAll("td");

            FORM.firstName.value = cells[0].textContent;
            FORM.surname.value = cells[1].textContent;
            FORM.address.value = cells[2].textContent;
            FORM.age.value = cells[3].textContent;

            STATE.editingStudentId = studentId;
            FORM.querySelector("button").textContent = "Save changes";
        });
    });
}
