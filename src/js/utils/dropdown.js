import refs from './refs';
import validation from './validation';
const toggleListenerOnForm = validation.toggleListenerOnForm.bind(validation);

refs.form.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        validation.closeFormMenu();
    }
});

refs.form.addEventListener('click', toggleListenerOnForm);

export default toggleListenerOnForm;