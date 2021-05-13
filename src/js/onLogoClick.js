import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import { startPagination } from './pagination';

refs.logo.addEventListener('click', onLogoClick);

function onLogoClick() {
  apiService.resetPage();
  apiService.getWorldUpcomingEvents().then(data => {
    validation.location(data);
    validation.imageUrl(data);
    const markup = cardListHbs(data);
    refs.gallery.innerHTML = markup;
    startPagination();
    refs.countryBtn.textContent = "Choose country";
    refs.categoryBtn.textContent = "Event category";
  }).catch(console.log);
}
