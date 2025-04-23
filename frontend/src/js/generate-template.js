import { TABLE_BODY, STATE } from "./constants/global.js";
import { handleClickTableRow } from "./handlers.js";
import { deleteStudent } from "./api/api.js";

export function renderTable(data) {
    // Очищаем таблицу перед рендером.
    TABLE_BODY.innerHTML = "";

    const html = data
        .map(
            (student) => `
    <tr data-id="${student.id}">
      <td>${student.firstName}</td>
      <td>${student.surname}</td>
      <td>${student.address}</td>
      <td>${student.age}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    </tr>`,
        )
        .join("");

    TABLE_BODY.insertAdjacentHTML("beforeend", html);

    // Сброс состояния.
    STATE.clickedStudent = null;
    STATE.tableRowCheckedId = null;

    // Удаление.
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", deleteStudent);
    });

    // Редактирование через строку.
    const tableRows = document.querySelectorAll("#studentTable tr");
    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (event) => {
            if (event.target.tagName !== "BUTTON") {
                handleClickTableRow(event, data);
            }
        });
    });
}
