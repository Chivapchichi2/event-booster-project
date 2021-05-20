import refs from '../utils/refs';

refs.form.addEventListener('click', (e) => {
    setTimeout(() => {
        refs.theme.classList.remove('animate__fadeIn');
    },1500)

    if (e.target.textContent === 'Sports') {
        ResetTheme();
        refs.theme.classList.add('sport-theme');
        refs.theme.classList.add('animate__fadeIn');
    }
    
    if (e.target.textContent === 'Film') {
        ResetTheme();
        refs.theme.classList.add('films-theme');
        refs.theme.classList.add('animate__fadeIn');
    }

    if (e.target.textContent === 'Arts & Theatre') {
        ResetTheme();
        refs.theme.classList.add('theatre-theme');
        refs.theme.classList.add('animate__fadeIn');
    }

    if (e.target.textContent === 'Miscellaneous') {
        ResetTheme();
        refs.theme.classList.add('misc-theme');
        refs.theme.classList.add('animate__fadeIn');
    }

    if (e.target.textContent === 'Event category' || e.target.textContent === 'Music') {
        ResetTheme();
        refs.theme.classList.add('overlay');
        refs.theme.classList.add('animate__fadeIn');
    }

})

function ResetTheme() {
    
    refs.theme.classList.remove('overlay');
    refs.theme.classList.remove('sport-theme');
    refs.theme.classList.remove('films-theme');
    refs.theme.classList.remove('theatre-theme');
    refs.theme.classList.remove('misc-theme');
    
}

export default ResetTheme;