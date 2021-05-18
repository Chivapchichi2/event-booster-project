import registration from './utils/firebaseApi';
import refs from './utils/refs';
import 'firebaseui/dist/firebaseui.css';

window.addEventListener('load', () => registration.initApp());

refs.registrationBtn.addEventListener('click', () => {
  // if (refs.registrationBtn.firstElementChild === refs.iconIn) { }

  // openCloseModal();
  registration.start('#firebaseui-auth-container');
});