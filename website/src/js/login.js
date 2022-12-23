"use strict";

import * as model from "./model.js";

const form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const alert = document.querySelector(".alert");

const showAlert = async function (message, flag = true) {
  alert.textContent = message;
  alert.classList.toggle("alert-hide");
  alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);

  setTimeout(() => {
    alert.classList.toggle("alert-hide");
    alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);
    alert.textContent = "";
  }, 3000);
};

(() => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const flag = form.checkValidity();

    form.classList.add("was-validated");

    if (!flag) {
      e.stopPropagation();
      return;
    }

    const formData = new FormData(form);
    const loginData = {};

    [...formData.entries()].forEach(
      (entry) => (loginData[entry[0]] = entry[1])
    );
    const res = await model.signIn(loginData);

    if (!res) {
      showAlert("Wrong user name or password", false);
      form.classList.remove("was-validated");
      return;
    }

    window.location = "http://localhost:8000/home";
  });
})();

document.querySelector(".sign-up").addEventListener("click", () => {
  window.location = "http://localhost:8000/createAccount";
});

// const postData = async (formattedFormData) => {
//   const res = await fetch("src/php/login.php", {
//     method: "POST",
//     body: JSON.stringify(formattedFormData),
//   });

//   const data = await res.json();

//   if (data.success) {
//     window.location = `src/php/welcome.php?name=${data["0"].name}`;
//   } else {
//     if (form.email.value !== "" && form.password.value !== "")
//       document.querySelector(".modal-btn").click();
//   }
// };
