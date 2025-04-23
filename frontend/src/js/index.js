import { resetForm } from "../js/helpers/reset-form.js";
import { loadJSON } from "./api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
    resetForm();
    await loadJSON();
});


