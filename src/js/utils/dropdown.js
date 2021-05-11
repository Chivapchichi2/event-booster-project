import refs from './refs';


window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        close()
    }
     
    
})

window.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.name === 'country') {
        refs.countryMenu.classList.toggle('show');
        refs.categoryMenu.classList.remove('show');
        return;
    }

    if (e.target.name === 'category') {
        refs.categoryMenu.classList.toggle('show');
        refs.countryMenu.classList.remove('show');
        return;
    }

    close();
})

function close() {
    refs.countryMenu.classList.remove('show');
    refs.categoryMenu.classList.remove('show');
}