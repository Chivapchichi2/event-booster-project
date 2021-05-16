import refs from './utils/refs';

let intervalID;
function setIntervalX(callback, delay, repetitions) {
  let x = 0;

  intervalID = setInterval(function () {
    callback();
    refs.inputEmail.value = '';

    setTimeout(() => {
      closePopUp();
    }, 60000);

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay);
}

setIntervalX(
  function () {
    refs.popUpRef.classList.remove('is-hidden');
  },
  120000,
  3,
);

//*по клику на subscribe рамка меняет цвет + закрывает, если ок
refs.subscribeBtn.addEventListener('click', () => {
  if (!refs.inputEmail.value.includes('@')) {
    changeInputBorderColor('red');
    return;
  }
  changeInputBorderColor('black');
  refs.inputEmail.style.boxShadow =
    ' 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de';

  setTimeout(() => {
    closePopUp();
    changeInputBorderColor('#dc56c5');
    clearInterval(intervalID);
  }, 250);
});

//*закрывает по "х"
refs.closePopupBtn.addEventListener('click', () => {
  refs.inputEmail.style.borderColor = 'inherit';
  closePopUp();
});
//*закрывает по "escape"
window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closePopUp();
  }
});

function closePopUp() {
  refs.popUpRef.classList.add('is-hidden');
}
function changeInputBorderColor(color) {
  refs.inputEmail.style.borderColor = color;
}
