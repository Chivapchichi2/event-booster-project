import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import renderCountriesListFilter from './render/renderCountriesFilter'

refs.logo.addEventListener('click', onLogoClick);

function onLogoClick() {
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
    refs.countriesList.innerHTML = "<option>Chose country</option>";
    renderCountriesListFilter();

  });
}
