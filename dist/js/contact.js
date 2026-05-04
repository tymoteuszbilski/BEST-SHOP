"use strict";
const email = document.getElementById("email");
email.addEventListener("input", () => isValidEmail(email.value));
function isValidEmail(input) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    regex.test(input);
}
