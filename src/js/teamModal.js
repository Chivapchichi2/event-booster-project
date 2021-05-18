import toggleListenerOnForm from './utils/dropdown.js';

document.querySelector('.openModalLink').addEventListener('click', openModal);

let isInit = false;
function openModal(e) {
  document.removeEventListener('click', toggleListenerOnForm);

  let elModal = document.querySelector('#Modal');
  if (isInit === false) {
    isInit = true;
    document
      .querySelector('.prefix-close')
      .addEventListener('click', function (event) {
        event.preventDefault();
        elModal.classList.add('active');
      });
  }
  elModal.classList.add('active');
  elModal.style.overflow = 'scroll';
  document.body.style.overflow = 'hidden';
}

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeTeamModalUp();
  }
});

function closeTeamModalUp() {
  document.addEventListener('click', toggleListenerOnForm);

  document.querySelector('#Modal').classList.remove('active');
  document.body.style.overflow = 'inherit';
}
