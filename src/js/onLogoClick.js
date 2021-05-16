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
  refs.countryBtn.innerHTML = `Choose country   <svg class="icon-down" width="15" height="10">
                <use href="./images/sprite.svg#icon-down-btn"></use>
              </svg>`;
  refs.categoryBtn.innerHTML = `Event category   <svg class="icon-down" width="15" height="10">
                <use href="./images/sprite.svg#icon-down-btn"></use>
              </svg>`;
  apiService.getWorldUpcomingEvents().then(data => {
    validation.galleryRender(data, cardListHbs);
    startPagination();
  }).catch(console.log);
}
