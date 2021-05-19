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
    // refs.userData.firstElementChild.src = url ? url : 'http://3.bp.blogspot.com/-CrGkU8X7yZY/U5d2BTp-hYI/AAAAAAAAIl8/ccmJHioTFT0/s40/anonymous-emoticon.png';
    // refs.userData.firstElementChild.alt = name ? name : 'Anonymous';
    // refs.userName.textContent = name ? name : 'Anonymous';
     
     refs.userData.innerHTML = `<img
            class="user-image"
            src=${url}
            alt=${name}
          />
          <button class="user-pageBtn" type="button" aria-label="user-events">
            My events
          </button>`
    refs.registrationBtn.innerHTML = `Sign out
          <svg class="svg-menu" data-sign='out' aria-label="log-button">
            <use class="icon-out" href="./images/sprite.svg#icon-exit"></use>
          </svg>`;
  },
  noSignedUser() {
    refs.userData.firstElementChild.src =  'http://3.bp.blogspot.com/-CrGkU8X7yZY/U5d2BTp-hYI/AAAAAAAAIl8/ccmJHioTFT0/s40/anonymous-emoticon.png';
    refs.userData.firstElementChild.alt = 'Anonymous';
    // refs.userName.textContent = 'Anonymous';
    refs.registrationBtn.innerHTML = `Sign in
          <svg class="svg-menu" data-sign='in' aria-label="log-button">
            <use class="icon-in" href="./images/sprite.svg#icon-log-in"></use>
          </svg>`
  },
  addRegListeners() {
    document.addEventListener('keydown', this.onEscCloseRegModal);
    refs.registrationBackdrop.addEventListener('click', this.onBackdropOrCloseBtnCloseRegModal);
  },
  removeRegListeners() {
    document.removeEventListener('keydown', this.onEscCloseRegModal);
    refs.registrationBackdrop.removeEventListener('click', this.onBackdropOrCloseBtnCloseRegModal);
  },
  onEscCloseRegModal(e) {
    if (e.code === 'Escape') {
      this.closeRegModal()
    }
  },
  onBackdropOrCloseBtnCloseRegModal(e) {
    if (e.target.classList.contains('backdrop')
      || e.target.classList.contains('registration-closeBtn')
      || e.target.classList.contains('team-close-popup-btn')) {
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
