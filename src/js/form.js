import refs from './utils/refs';
import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import validation from './utils/validation';
import countriesData from './data/countriesDataList';
import genresData from './data/classificationNameList';
import { startPagination } from './pagination';
const debounce = require('lodash.debounce');

refs.form.addEventListener('change', e => {
  if (!e.target.classList.contains('select')) {
    return
  }
  apiService.resetPage();
  let countyCode = validation.transformCountriesNameIntoCode(refs.countriesList.value, countriesData);
  let genreId = validation.transformGenreIntoId(refs.genresList.value, genresData);
  apiService.getEventsByFilter(genreId, countyCode)
    .then(data => {
      if (!data) {
        validation.noData();
        return
      }

      validation.location(data);
      validation.imageUrl(data);
      refs.gallery.innerHTML = cardListHbs(data);
      startPagination();
    }).catch(console.log);
});

const onSearchInput = e => {
  if (!e.target.classList.contains('js-search-input')) {
    return
  }

  apiService.resetPage();
  apiService.searchQuery = e.target.value;
  apiService.getEventsBySearchQuery(apiService.searchQuery).then(data => {
    if (!data) {
      validation.noData();
      e.target.value = '';
      apiService.searchQuery = '';
      return
    }
    validation.location(data);
    validation.imageUrl(data);
    refs.gallery.innerHTML = cardListHbs(data);
    startPagination();
  }).catch(console.log);
}

refs.form.addEventListener('input', debounce(onSearchInput, 1000));
refs.searchInput.addEventListener('click', e => e.target.value = '');

const stopFormReload = e => {
  e.preventDefault()
}

refs.form.addEventListener('submit', stopFormReload);
