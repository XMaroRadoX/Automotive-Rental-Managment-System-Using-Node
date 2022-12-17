"use strict";
const form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const modalMsg = document.querySelector(".modal-body");
const btnCloseModal = document.querySelector(".modal-btn-close");
const btnModal = document.querySelector(".modal-btn");
const labelTitle = document.querySelector(".modal-title");
const btnClose = document.querySelector(".btn-close");

(() => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
    }

    form.classList.add("was-validated");

    if (this.password.value !== this.confirmPassword.value) {
      renderError("Passwords do not match");
      return;
    }

    if (String(this.password.value).length < 8) {
      renderError("Passwords must be at least 8 characters");
      return;
    }

    const formattedFormData = {
      email: this.email.value,
      password: this.password.value,
      name: this.username.value,
    };

    if ((await checkMail(formattedFormData.email)) === 400) {
      renderError("Enter a valid email address");
      return;
    }

    postData(formattedFormData);
  });
})();

const renderError = (msg) => {
  if (btnCloseModal.classList.contains("btn-success"))
    btnCloseModal.classList.remove("btn-success");
  btnCloseModal.classList.add("btn-danger");
  modalMsg.textContent = msg;
  labelTitle.textContent = "Error";
  btnModal.click();
};

const renderSuccess = (msg) => {
  if (btnCloseModal.classList.contains("btn-danger"))
    btnCloseModal.classList.remove("btn-danger");
  btnCloseModal.classList.add("btn-success");
  modalMsg.textContent = msg;
  labelTitle.textContent = "Congratulations";
  btnModal.click();
};

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

const postData = async (formattedFormData) => {
  const res = await fetch("../php/register.php", {
    method: "POST",
    body: JSON.stringify(formattedFormData),
  });

  const data = await res.json();

  if (data.success) {
    renderSuccess(data.message);
  } else {
    renderError(data.message);
  }
};

const close = () => {
  if (btnCloseModal.classList.contains("btn-success")) {
    window.location = "../../index.html";
  }
};

btnCloseModal.addEventListener("click", close);
btnClose.addEventListener("click", close);
