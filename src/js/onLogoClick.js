import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import { startPagination } from './pagination';
import { getAndCheckUserEvents } from './myEvents';
import resetTheme from './utils/theme';

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
  
  resetTheme();
  refs.theme.classList.add('overlay');
    refs.mapContainer.classList.remove('is-hidden');
  refs.form.classList.remove('is-hidden');
  refs.form.classList.replace('outUp', 'inDown');
  setTimeout(() => {
    document.getElementById('user-events').textContent = 'My events';
    refs.heroTitle.innerHTML = "FIND &nbsp; BEST &nbsp; EVENTS <br />AROUND &nbsp; THE &nbsp; WORLD";
  }, 1000);
  apiService.getEventsData()
    .then(r => {
        apiService.totalElements = r?.page?.totalElements;
        const data = r?._embedded?.events;
        return data;
    })
    .then(getAndCheckUserEvents)
    .then(data => {
      validation.galleryRender(data, cardListHbs);
      startPagination();
    })
    .catch(console.log);
}

export { onLogoClick }
