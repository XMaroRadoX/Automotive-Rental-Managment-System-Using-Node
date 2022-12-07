export default class View {
  _userData;

  renderSpinner(parent) {
    const html = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
       </div>`;

    this._clear(parent);
    parent.insertAdjacentHTML("afterbegin", html);
  }

  _clear(parent) {
    parent.innerHTML = "";
  }
}
