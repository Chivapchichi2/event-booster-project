import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import renderCountriesListFilter from './render/renderCountriesFilter';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 500,
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

ref.next.addEventListener('click', onNextBtnClick);
ref.prev.addEventListener('click', onPrevBtnClick);
// refs.pagination.addEventListener('click', onPagination);
//! Button '>'
function onNextBtnClick() {
  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingNextBtnClick();
  }
  if (apiService.galleryStatus === 'ById') {
    onIdNextBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchNextBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterNextBtnClick();
  }
  //   showCurrentPage();
}

function onUpcomingNextBtnClick() {
  console.log(apiService.page);
  apiService.incrementPage();
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onIdNextBtnClick() {
  apiService.incrementPage();
  apiService.getEventById(id).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onSearchNextBtnClick() {
  apiService.incrementPage();
  getEventsBySearchQuery(searchQuery).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onFilterNextBtnClick() {
  apiService.incrementPage();
  getEventsByFilter(genre, countryName).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onPrevBtnClick() {
  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingPrevBtnClick();
  }
  if (apiService.galleryStatus === 'ById') {
    onIdPrevBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchPrevBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterPrevBtnClick();
  }
  //   showCurrentPage();
}
// function showCurrentPage() {
//   //   apiService.page = 1;
//   //   refs.selected.textContent = Number(apiService.page);
//   console.log('refs.selected.textContent', refs.selected.textContent);
//   //   ref.next.textContent = ' ' + (apiService.page + 1);
//   console.log('ref.next.textContent', ref.next.textContent);
//   //   ref.prev.textContent = ' ' + (apiService.page - 1);
//   console.log('ref.prev.textContent', ref.prev.textContent);
// }

function onUpcomingPrevBtnClick() {
  apiService.decrementPage();
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onIdPrevBtnClick() {
  apiService.decrementPage();
  apiService.getEventById(id).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onSearchPrevBtnClick() {
  apiService.decrementPage();
  getEventsBySearchQuery(searchQuery).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}
function onFilterPrevBtnClick() {
  apiService.decrementPage();
  getEventsByFilter(genre, countryName).then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.gallery.innerHTML = markup;
  });

  onScrollToTop();
}

// //! '1,2,3' button
// function onPagination(e) {
//   e.preventDefault();
//   const onBtnClick = e.target;

//   if (onBtnClick.textContent === 'first') {
//     apiService.resetPage();
//     apiService.page = 1;
//     console.log('apiService.page', apiService.page);
//     onRenderPage(apiService.page);
//     return;
//   } else if (onBtnClick.textContent === 'prev') {
//     onNextPrevClick();
//     return;
//   } else if (onBtnClick.textContent === 'next') {
//     onNextBtnClick();

//     return;
//   } else if (onBtnClick.textContent === 'last') {
//     apiService.page = 49;

//     onNextBtnClick(apiService.page);
//     return;
//   }
//   //   apiService.page = onBtnClick.textContent;
//   //   onRenderPage(apiService.page);

//   onScrollToTop();
// }

// //!render function
// function onRenderPage(newPage) {
//   apiService.page = newPage;
//   apiService.getWorldUpcomingEvents().then(data => {
//     validation.imageUrl(data);
//     const markup = cardListHbs(data);

//     refs.gallery.innerHTML = markup;
//   });
//   onScrollToTop();
// }
