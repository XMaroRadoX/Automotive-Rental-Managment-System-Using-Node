"use strict";

import { SERVER_URL } from "./config.js";
import * as model from "./model.js";

const form = document.querySelector(".form");
const alert = document.querySelector(".alert");

const showAlert = async function (message, flag = true) {
  alert.textContent = message;
  alert.classList.toggle("alert-hide");
  alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);

  setTimeout(() => {
    alert.classList.toggle("alert-hide");
    alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);
    alert.textContent = "";
  }, 2000);
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
      "Registration completed successfully, redirecting you to login page"
    );

    setTimeout(() => {
      window.location = `${SERVER_URL}/logIn`;
    }, 2200);
  });
})();

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

document.querySelector("footer").innerHTML = `
      Copyrights &copy; ${new Date().getFullYear()} Amr Yasser, Marwan Khaled, and Begad Wael
`;

document
  .querySelector(".btn-outline-primary")
  .addEventListener("click", () => (window.location = `${SERVER_URL}/`));
