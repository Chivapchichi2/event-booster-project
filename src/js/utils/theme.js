import refs from '../utils/refs';

console.log(refs.categoryBtn);
refs.form.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === 'Sport') {
        ResetTheme();
        refs.theme.classList.add('sport-theme');
    }
    
    if (e.target.textContent === 'Film') {
        ResetTheme();
        refs.theme.classList.add('films-theme');
    }

    if (e.target.textContent === 'Arts & Theatre') {
        ResetTheme();
        refs.theme.classList.add('theatre-theme');
    }

    if (e.target.textContent === 'Miscellaneous') {
        ResetTheme();
        refs.theme.classList.add('misc-theme');
    }

    if (e.target.textContent === 'Event category' || e.target.textContent === 'Music') {
        ResetTheme();
        refs.theme.classList.add('overlay');
    }

})

function ResetTheme() {
    refs.theme.classList.remove('overlay');
    refs.theme.classList.remove('sport-theme');
    refs.theme.classList.remove('films-theme');
    refs.theme.classList.remove('theatre-theme');
    refs.theme.classList.remove('misc-theme');
    
}