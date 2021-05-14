import validation from './validation';
const toggleListenerOnForm = validation.toggleListenerOnForm.bind(validation);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        validation.closeFormMenu();
    }
});

window.addEventListener('click', toggleListenerOnForm);

export default toggleListenerOnForm;