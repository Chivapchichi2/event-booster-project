import refs from './utils/refs';
import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import validation from './utils/validation';
import countriesData from './data/countriesDataList';
import genresData from './data/classificationNameList';
import { startPagination } from './pagination';
import { getAndCheckUserEvents } from './myEvents';
const debounce = require('lodash.debounce');

refs.form.addEventListener('click', e => {
  e.preventDefault();
  if (validation.checkTargetNodeName(e)) {
    validation.changeBtnText(e);
    apiService.resetPage();
    apiService.countryCode = validation.transformCountriesNameIntoCode(refs.countryBtn.textContent.trim(), countriesData);
    apiService.genresId = validation.transformGenreIntoId(refs.categoryBtn.textContent.trim(), genresData);
    apiService.getEventsData()
      .then(r => {
        if (!r?._embedded?.events) {
          validation.noData();
          return
        }
        apiService.totalElements = r.page.totalElements;
        return r._embedded.events;
      })
      .then(getAndCheckUserEvents)
      .then(data => {
        validation.galleryRender(data, cardListHbs);
        startPagination();
      })
      .catch(console.log)
  }
});

const onSearchInput = e => {
  if (!e.target.classList.contains('js-search-input')) {
    return
  }

  apiService.resetPage();
  apiService.searchQuery = e.target.value;
  apiService.getEventsData()
    .then(r => {
      if (!r?._embedded?.events) {
        validation.noData();
        e.target.value = '';
        apiService.searchQuery = '';
        return
      }
      apiService.totalElements = r.page.totalElements;
      return r._embedded.events;
    })
    .then(getAndCheckUserEvents)
    .then(data => {
      validation.galleryRender(data, cardListHbs);
      startPagination();
    })
    .catch(console.log);
}

refs.form.addEventListener('input', debounce(onSearchInput, 1000));
refs.searchInput.addEventListener('click', e => {
  e.target.value = '';
  apiService.searchQuery = '';
});

const stopFormReload = e => {
  e.preventDefault()
}

refs.form.addEventListener('submit', stopFormReload);
