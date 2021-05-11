import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';

refs.logo.addEventListener('click', onLogoClick);

function onLogoClick() {
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);

    const markup = cardListHbs(data);
    refs.gallery.innerHTML = markup;

    refs.countriesList.value = "Choose country";
    refs.genresList.value = "Event category";
  });
}
