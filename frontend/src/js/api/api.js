/**
 * Создана константа BASE_URL для повторяющегося адреса.
 * Введена строгая проверка response.ok с throw, чтобы централизованно отлавливать ошибки.Обработчики ошибок теперь дают точную информцию.
 * Использовано for..of вместо Array.from — стало почище.
 * Использую closest('tr') и ?. — надёжнее, чем parentElement.parentElement.
 * Удалены дублирующие комментарии.
 */

import { FORM } from "../constants/global.js";
import { resetForm } from "../helpers/reset-form.js";
import { Notification } from "../components/notification.js";
import { renderTable } from "../generate-template.js";

const BASE_URL = "http://localhost:3000/students";

/**
 * Получаем всех студентов с сервера и отрисовать таблицу.
 */
export const loadStudents = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok)
            throw new Error(`Ошибка загрузки: ${response.status}`);

        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error("Ошибка при загрузке студентов:", error);
    }
};

/**
 * Добавляем нового студента.
 */
export const addStudent = async () => {
    const student = {};

    for (const element of FORM?.elements || []) {
        if (element.name) {
            student[element.name] = element.value;
        }
    }

    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
        });

        if (!response.ok)
            throw new Error(`Ошибка добавления: ${response.status}`);

        new Notification({
            title: "Информация о добавлении:",
            subtitle: "Студент успешно добавлен",
        });

        resetForm();
        loadStudents();
    } catch (error) {
        console.error("Ошибка при добавлении студента:", error);
    }
};

/**
 * Обновляем данные студента.
 * @param {string} studentId
 * @param {object} updatedData
 */
export const updateStudent = async (studentId, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok)
            throw new Error(`Ошибка обновления: ${response.status}`);

        new Notification({
            title: "Информация о обновлении:",
            subtitle: "Студент успешно обновлен",
        });

        loadStudents();
    } catch (error) {
        console.error("Ошибка при обновлении студента:", error);
    }
};

/**
 * Удаляем студента.
 * @param {Event} e
 */
export const deleteStudent = async (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const row = e.target.closest("tr");
    const studentId = row?.id;

    if (!studentId) return;

    row.remove();

    try {
        const response = await fetch(`${BASE_URL}/${studentId}`, {
            method: "DELETE",
        });

        if (!response.ok)
            throw new Error(`Ошибка удаления: ${response.status}`);

        new Notification({
            title: "Информация о удалении:",
            subtitle: "Студент успешно удален",
        });

        resetForm();
        loadStudents();
    } catch (error) {
        console.error("Ошибка при удалении студента:", error);
    }
};

/**
 * Загружам данные студента в форму для редактирования.
 * @param {string} id
 */
export const editStudent = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok)
            throw new Error(`Ошибка загрузки: ${response.status}`);

        const student = await response.json();

        document.querySelector("#name").value = student.name;
        document.querySelector("#surname").value = student.surname;
        document.querySelector("#address").value = student.address;
        document.querySelector("#age").value = student.age;

        // сохраняем ID для дальнейшего обновления.
        currentEditingId = id;
    } catch (error) {
        console.error("Ошибка при получении студента:", error);
    }
};
