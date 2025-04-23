import { FORM } from "../constants/global.js";
import { resetForm } from "../helpers/reset-form.js";
import { Notification } from "../components/notification.js";
import { renderTable } from "../generate-template.js";

/**
 * Функция отрисовки данных с сервера
 */
export const loadJSON = async () => {
    try {
        const response = await fetch(`http://localhost:3000/students`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        } else {
            console.error("Ошибка загрузки данных", response.status);
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

/**
 * Функция добавления студента
 */
export const addStudent = async () => {
    const student = {};

    Array.from(FORM?.elements).forEach((element) => {
        if (element.name) {
            student[element.name] = element.value;
        }
    });

    try {
        const response = await fetch(`http://localhost:3000/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
        });
        if (response.ok) {
            new Notification({
                title: "Информация о добавлении:",
                subtitle: "Студент успешно добавлен",
            });
            resetForm();
            loadJSON();
        } else {
            console.log(`Error to add student.`);
        }
    } catch (error) {
        console.log("Error", error);
    }
};

/**
 * Функция обновляет измененные данные студента на сервере
 * @param {string} studentId - Идентификатор студента
 * @param {object} updateStudentData - Обновленные данные студента
 */
export const updateStudentData = async (studentId, updateStudentData) => {
    try {
        const response = await fetch(
            `http://localhost:3000/students/${studentId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateStudentData),
            },
        );
        if (response.ok) {
            new Notification({
                title: "Информация о обновлении:",
                subtitle: "Студент успешно обновлен",
            });
            loadJSON();
        } else {
            console.log(`Error updating student data: ${response.statusText}`);
        }
    } catch (error) {
        console.log("Error updating student data:", error);
    }
};

/**
 * Функция удаления студента из таблицы и из сервера
 * @param {object} e - Объект события
 */
export const deleteStudent = async (e) => {
    let deleteStudent;
    if (e.target.tagName === "BUTTON") {
        deleteStudent = e.target.parentElement.parentElement;
        let deleteStudentId = e.target.parentElement.parentElement.id;

        deleteStudent.remove();
        try {
            const response = await fetch(
                `http://localhost:3000/students/${deleteStudentId}`,
                {
                    method: "DELETE",
                },
            );
            if (response.ok) {
                new Notification({
                    title: "Информация о удалении:",
                    subtitle: "Студент успешно удален",
                });
                resetForm();
                loadJSON();
            } else {
                console.log(`Error to delete student.`);
            }
        } catch {
            console.log("Error", error);
        }
    }
};
