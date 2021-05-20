import refs from './utils/refs';
const debounce = require('lodash.debounce');

window.onscroll = debounce(scrollFunction, 250);

refs.myButton.addEventListener('click', onScrollToTop);

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    refs.myButton.style.display = 'block';
    refs.myButton.classList.add('animate__bounceInDown');
    refs.myButton.classList.remove('animate__bounceOutUp');
  } else {
    refs.myButton.style.display = 'none';
    refs.myButton.classList.remove('animate__bounceInDown');
  }
}

function onScrollToTop() {
  refs.myButton.classList.add('animate__bounceOutUp');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

export default onScrollToTop;