import {
    FORM,
    STATE,
    FIRST_NAME_INPUT,
    SURNAME_INPUT,
    ADDRESS_INPUT,
    AGE_INPUT,
} from "./constants/global.js";
import { resetForm } from "./helpers/reset-form.js";
import { addStudent, updateStudentData } from "./api/api.js";

/**
 *
 * Функция передачи данных при клике по строке таблицы в форму
 * @param {object} event - Объект события
 * @param {array} data - Массив данных
 */
export const handleClickTableRow = (event, data) => {
    STATE.tableRowCheckedId = event.currentTarget.id;

    const clickedStudentData = data.find(
        (student) => student.id === STATE.tableRowCheckedId,
    );
    
    if (clickedStudentData) {
        STATE.clickedStudent = clickedStudentData;
        FIRST_NAME_INPUT.value = clickedStudentData.firstName;
        SURNAME_INPUT.value = clickedStudentData.surname;
        ADDRESS_INPUT.value = clickedStudentData.address;
        AGE_INPUT.value = clickedStudentData.age;
    }
};

/**
 * Обработчик события отправки формы
 */
FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    if (STATE.tableRowCheckedId) {
        STATE.clickedStudent.firstName = FIRST_NAME_INPUT.value;
        STATE.clickedStudent.surname = SURNAME_INPUT.value;
        STATE.clickedStudent.address = ADDRESS_INPUT.value;
        STATE.clickedStudent.age = AGE_INPUT.value;
        updateStudentData(STATE.tableRowCheckedId, STATE.clickedStudent);
        resetForm();
    } else {
        addStudent();
    }
});
