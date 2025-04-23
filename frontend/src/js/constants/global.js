// Таблица со списком студентов
export const TABLE_STUDENTS = document.querySelector(`#studentTable`);
export const TABLE_BODY = TABLE_STUDENTS.lastElementChild;

// Форма для добавления студента
export const FORM = document.querySelector(`#studentForm`);

// Поля для ввода данных студента
export const FIRST_NAME_INPUT = document.querySelector(`#firstName`);
export const SURNAME_INPUT = document.querySelector(`#surname`);
export const ADDRESS_INPUT = document.querySelector(`#address`);
export const AGE_INPUT = document.querySelector(`#age`);
export const SUBMIT_BUTTON = document.querySelector(`.btn-outline`);

// Объект для хранения состояния приложения
export const STATE = {
    clickedStudent: null,
    tableRowCheckedId: null,
    editingStudentId: null,
};
