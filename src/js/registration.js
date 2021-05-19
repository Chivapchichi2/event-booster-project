import registration from './utils/firebaseApi';
import refs from './utils/refs';
import 'firebaseui/dist/firebaseui.css';
import firebaseFunctions from './utils/firebaseRegistrationHelpers';

firebaseFunctions.onEscCloseRegModal = firebaseFunctions.onEscCloseRegModal.bind(firebaseFunctions);
firebaseFunctions.onBackdropOrCloseBtnCloseRegModal = firebaseFunctions.onBackdropOrCloseBtnCloseRegModal.bind(firebaseFunctions);

window.addEventListener('load', () => registration.initApp());

refs.registrationBtn.addEventListener('click', () => {
  if (refs.registrationBtn.firstElementChild.dataset.sign === 'out') {
    registration.signOut();
    firebaseFunctions.noSignedUser();
    firebaseFunctions.removeRegListeners();
    return
  }
  refs.registrationBackdrop.classList.remove('is-hidden');
  registration.start('#firebaseui-auth-container');
  firebaseFunctions.addCloseBtn();
  firebaseFunctions.addRegListeners();
});

// refs.userData.addEventListener('click', (e) => {
//   if (e.target === document.getElementById('user-events')) {
//     if (document.getElementById('user-events').dataset.sign === 'out') {
//       return refs.registrationBtn.click();
//     }
//     // renderMyEventsPage ()
//     refs.gallery.innerHTML = '';
//     refs.form.classList.add('is-hidden');
// }
// } );