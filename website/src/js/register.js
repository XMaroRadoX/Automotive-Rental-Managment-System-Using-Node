"use strict";

import * as model from "./model.js";

const form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const modalMsg = document.querySelector(".modal-body");
const btnCloseModal = document.querySelector(".modal-btn-close");
const btnModal = document.querySelector(".modal-btn");
const labelTitle = document.querySelector(".modal-title");
const btnClose = document.querySelector(".btn-close");
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
    const regData = {};

    [...formData.entries()].forEach((entry) => (regData[entry[0]] = entry[1]));

    if (regData.password !== regData.confirmPassword) {
      showAlert("Passwords do not match", false);
      form.classList.remove("was-validated");
      return;
    }

    if (regData.password.length < 8) {
      showAlert("Passwords must be at least 8 characters", false);
      form.classList.remove("was-validated");
      return;
    }

    if ((await checkMail(regData.email)) === 400) {
      showAlert("Invalid email address", false);
      form.classList.remove("was-validated");
      return;
    }

    const res = await model.register(regData);

    if (!res) {
      showAlert("Registration failed", false);
      return;
    }

    showAlert(
      "Registration completed successfully,redirecting you to login page"
    );

    setTimeout(() => {
      window.location = "http://localhost:8000/";
    }, 3100);
  });
})();

// const renderError = (msg) => {
//   if (btnCloseModal.classList.contains("btn-success"))
//     btnCloseModal.classList.remove("btn-success");
//   btnCloseModal.classList.add("btn-danger");
//   modalMsg.textContent = msg;
//   labelTitle.textContent = "Error";
//   btnModal.click();
// };

// const renderSuccess = (msg) => {
//   if (btnCloseModal.classList.contains("btn-danger"))
//     btnCloseModal.classList.remove("btn-danger");
//   btnCloseModal.classList.add("btn-success");
//   modalMsg.textContent = msg;
//   labelTitle.textContent = "Congratulations";
//   btnModal.click();
// };

const checkMail = async (mail) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const res = await fetch(
    `https://api.mailcheck.ai/email/${mail}`,
    requestOptions
  );

  const data = await res.json();

  return data.status;
};

// const postData = async (formattedFormData) => {
//   const res = await fetch("../php/register.php", {
//     method: "POST",
//     body: JSON.stringify(formattedFormData),
//   });

//   const data = await res.json();

//   if (data.success) {
//     renderSuccess(data.message);
//   } else {
//     renderError(data.message);
//   }
// };

// const close = () => {
//   if (btnCloseModal.classList.contains("btn-success")) {
//     window.location = "../../index.html";
//   }
// };

// btnCloseModal.addEventListener("click", close);
// btnClose.addEventListener("click", close);
