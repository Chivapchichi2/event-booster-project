import registration from './utils/firebaseApi';
import refs from './utils/refs';
import 'firebaseui/dist/firebaseui.css';
import firebaseFunctions from './utils/firebaseRegistrationHelpers';

firebaseFunctions.onEscCloseRegModal=firebaseFunctions.onEscCloseRegModal.bind(firebaseFunctions);
window.addEventListener('load', () => registration.initApp());

refs.registrationBtn.addEventListener('click', () => {
  if (refs.registrationBtn.firstElementChild.dataset.sign === 'out') {
    registration.signOut();
    firebaseFunctions.noSignedUser();
    firebaseFunctions.removeRegListeners();
    return
  }

  registration.start('#firebaseui-auth-container');
  firebaseFunctions.addRegListeners();
  console.log('ok1');
});