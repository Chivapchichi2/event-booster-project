import refs from './utils/refs';

//*срабатывает каждую мин (пропадает)
const intervalFunction = () => {
  refs.popUpRef.classList.remove('is-hidden');
  setTimeout(() => {
    refs.popUpRef.classList.add('is-hidden');
  }, 60000);
};
//*срабатывает каждые 2мин (появляется)
const interval = setInterval(intervalFunction, 120000);

refs.subscribeBtn.addEventListener('submit', () => {
  console.log(refs.inputEmail.value);
  if (!refs.inputEmail.value.includes('@')) {
    refs.inputEmail.style.borderColor = 'red';
    return;
  }
  refs.inputEmail.style.borderColor = 'black';
  refs.inputEmail.style.boxShadow =
    ' 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de';
  setTimeout(() => {
    refs.popUpRef.classList.add('is-hidden');
  }, 250);
});

refs.closePopupBtn.addEventListener('click', () => {
  refs.popUpRef.classList.add('is-hidden');
  clearInterval(interval);
});
