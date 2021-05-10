import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import renderCountriesListFilter from './render/renderCountriesFilter';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
});

const ref = {
  toStart: document.querySelector('.tui-first '),
  prev: document.querySelector('.tui-ico-prev'),
  selected: document.querySelector('.tui-is-selected'),
  first: document.querySelector('.tui-first-child'),
  loadMore: document.querySelector('.tui-next-is-ellip'),
  next: document.querySelector('.tui-next'),
  last: document.querySelector('.tui-last'),
};
console.log(ref.toStart);

refs.pagination.addEventListener('click', onPagination);
ref.toStart.addEventListener('click', onStartClick);
ref.loadMore.addEventListener('click', onLoadMoreClick);
ref.next.addEventListener('click', onNextClick);
ref.last.addEventListener('click', onLastClick);

function onStartClick() {
  apiService.resetPage();
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });
}

function onPagination(e) {
  const onBtnClick = e.target;
  if (onBtnClick === ref.toStart) {
    apiService.resetPage();
    apiService.getWorldUpcomingEvents().then(data => {
      validation.imageUrl(data);
      const markup = cardListHbs(data);

      refs.gallery.innerHTML = markup;
    });
  }

  apiService.page = onBtnClick.textContent;
  if (!onBtnClick.textContent) {
    console.log('return');
    return;
  }

  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });
}

function onLoadMoreClick(page) {
  console.log('...');
  console.log(e.target.textContent);
  apiService.page = page += 3;
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });
}
