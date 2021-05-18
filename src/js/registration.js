import registration from './utils/firebaseApi';
// import { openCloseModal } from './registration-helpers';
import refs from './utils/refs';
import 'firebaseui/dist/firebaseui.css';

window.addEventListener('load', () => registration.initApp());

refs.registrationBtn.addEventListener('click', () => {
  console.log('22');
  // if (refs.registrationBtn.firstElementChild.classList.contains('besom-broom')) return;

  // openCloseModal();
  registration.start('#firebaseui-auth-container');
});