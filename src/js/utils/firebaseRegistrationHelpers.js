import refs from './refs';

export default {
  buttonClose:`<button
                  type="button"
                  class="prefix-close registration-closeBtn"
                  title="Close"
                  data-action="close-pop-up"
                >
                  <svg class="team-close-popup-btn">
                    <use href="./images/sprite.svg#icon-close-icon"></use>
                  </svg>
                </button>`,
  signedUser(url, name) {
   refs.registrationBtn.innerHTML = `Sign out
          <svg class="svg-menu" data-sign='out' aria-label="log-button">
            <use class="icon-out" href="./images/sprite.svg#icon-exit"></use>
          </svg>`
  },
  noSignedUser() {
    refs.registrationBtn.innerHTML = `Sign in
          <svg class="svg-menu" data-sign='in' aria-label="log-button">
            <use class="icon-in" href="./images/sprite.svg#icon-log-in"></use>
          </svg>`
  },
  addRegListeners() {
    document.addEventListener('keydown', this.onEscCloseRegModal);
  },
  removeRegListeners() {
    document.removeEventListener('keydown', this.onEscCloseRegModal);
  },
  onEscCloseRegModal(e) {
    if (e.code === 'Escape') {
      this.closeRegModal()
    }
  },
  onBackdropOrCloseBtnCloseRegModal(e) {
    if (e.target) {
      this.closeRegModal()
    }
  },
  closeRegModal() {
    refs.registrationBackdrop.classList.add('is-hidden');
    this.removeRegListeners()},
  addCloseBtn() {
    refs.firebaseContainer.insertAdjacentHTML('beforeend', this.buttonClose);
  },
}
