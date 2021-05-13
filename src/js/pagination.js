import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import Pagination from 'tui-pagination';

function onScrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

//! '1,2,3' button
function onPagination(e) {
  e.preventDefault();
  const onBtnClick = e.target;

  // '<<'
  if (onBtnClick.textContent === 'first') {
    console.log(onBtnClick);
    apiService.resetPage();
    onRenderPage(apiService.page);
    return;

    // '<'
  } else if (onBtnClick.textContent === 'prev') {
    apiService.decrementPage();
    onPrevOrNextBtnClick();
    return;

    // '>'
  } else if (onBtnClick.textContent === 'next') {
    apiService.incrementPage();
    onPrevOrNextBtnClick();
    return;

    // '>>'
  } else if (onBtnClick.textContent === 'last') {
    apiService.page = document.querySelector('.tui-last-child').textContent;
    onPrevOrNextBtnClick();
    return;
  }
  apiService.page = +e.target.textContent;
  onRenderPage(apiService.page);
}

//! Button '>'
function onPrevOrNextBtnClick() {
  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterBtnClick();
  }
}

function onUpcomingBtnClick() {
  apiService.getWorldUpcomingEvents().then(data => {
    validation.galleryRender(data, cardListHbs);
  }).catch(console.log);

  onScrollToTop();
}

function onSearchBtnClick() {
  apiService.getEventsBySearchQuery(apiService.searchQuery).then(data => {
    validation.galleryRender(data, cardListHbs);
  }).catch(console.log);

  onScrollToTop();
}

function onFilterBtnClick() {
  apiService.getEventsByFilter(apiService.genresId, apiService.countyCode)
    .then(data => {
    validation.galleryRender(data, cardListHbs);
  }).catch(console.log);

  onScrollToTop();
}

// //!render function
function onRenderPage(newPage) {
  apiService.page = newPage;

  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterBtnClick();
  }

  onScrollToTop();
}

const option = {
  totalItems: 980,
  visiblePages: 3,
  itemsPerPage: 20,
  centerAlign: true,
}

function startPagination() {
  option.totalItems = apiService.totalElements < 980 ? apiService.totalElements : 980;
  const pagination = new Pagination(refs.pagination, option);
  refs.pagination.addEventListener('click', onPagination);
}
export { startPagination , option, onRenderPage}
