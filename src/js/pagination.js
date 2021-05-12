import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';

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
  if (apiService.searchQuery !== refs.searchInput.value) {
    apiService.resetPage()
  }
  apiService.searchQuery = refs.searchInput.value
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
  if (apiService.galleryStatus === 'BySearch') {
    onSearchBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterBtnClick();
  }

  onScrollToTop();
}
export { onPagination }
