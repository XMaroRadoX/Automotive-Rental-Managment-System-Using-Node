"use strict";

import * as model from "./model.js";
import { SERVER_URL } from "./config.js";

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

    window.location = `${SERVER_URL}/`;
  });
})();

document.querySelector(".sign-up").addEventListener("click", () => {
  window.location = `${SERVER_URL}/createAccount`;
});

document.querySelector("footer").innerHTML = `
      Copyrights &copy; ${new Date().getFullYear()} Amr Yasser, Marwan Khaled, and Begad Wael
`;
