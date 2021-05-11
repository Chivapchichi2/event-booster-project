import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 490,
  visiblePages: 3,
  centerAlign: true,
});

const ref = {
  toStart: document.querySelector('.tui-first'),
  prev: document.querySelector('.tui-prev'),
  selected: document.querySelector('.tui-is-selected'),
  first: document.querySelector('.tui-first-child'),
  loadMore: document.querySelector('.tui-next-is-ellip'),
  next: document.querySelector('.tui-next'),
  last: document.querySelector('.tui-last'),
};

function onScrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

refs.pagination.addEventListener('click', onPagination);

//! '1,2,3' button
function onPagination(e) {
  e.preventDefault();
  const onBtnClick = e.target;
  // '<<'
  if (onBtnClick.textContent === 'first') {
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
    apiService.page = 49;
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
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onSearchBtnClick() {
  apiService.getEventsBySearchQuery(searchQuery).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onFilterBtnClick() {
  refs.genresList.textContent = genre;

  apiService.getEventsByFilter((genre = ''), (countryName = '')).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
// //!render function
function onRenderPage(newPage) {
  apiService.page = newPage;
  console.log('newPage', newPage);

  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingBtnClick();
  }
  if (apiService.galleryStatus === 'ById') {
    onIdBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterBtnClick();
  }

  onScrollToTop();
}
