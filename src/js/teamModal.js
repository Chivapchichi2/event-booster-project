import toggleListenerOnForm from './utils/dropdown.js';
import refs from '../js/utils/refs';

refs.openModal.addEventListener('click', openModal);
refs.closeModal.addEventListener('click', closeModal);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModal();
  }
});
window.addEventListener('click', e => {
  if (e.target === refs.elModal) {
    closeModal();
  }
});

function openModal() {
  refs.elModal.classList.add('active');
  refs.elModal.style.overflow = 'scroll';
  document.body.style.overflow = 'hidden';
  document.removeEventListener('click', toggleListenerOnForm);
}
function closeModal() {
  refs.elModal.classList.remove('active');
  document.addEventListener('click', toggleListenerOnForm);
  document.body.style.overflow = 'inherit';
}
