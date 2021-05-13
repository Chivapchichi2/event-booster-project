import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import { startPagination } from './pagination';

refs.logo.addEventListener('click', onLogoClick);

function onLogoClick() {
  apiService.resetPage();
  apiService.genresId = '';
  apiService.countryCode = '';
  apiService.searchQuery = '';
  refs.countryBtn.textContent = "Choose country";
  refs.categoryBtn.textContent = "Event category";
  apiService.getWorldUpcomingEvents().then(data => {
    validation.galleryRender(data, cardListHbs);
    startPagination();
  }).catch(console.log);
}
