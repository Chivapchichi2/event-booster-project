// import refs from './refs';
import validation from './validation';
const toggleListenerOnForm = validation.toggleListenerOnForm.bind(validation);

// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//         validation.closeFormMenu();
//     }
// });

document.addEventListener('click', toggleListenerOnForm);

export default toggleListenerOnForm;