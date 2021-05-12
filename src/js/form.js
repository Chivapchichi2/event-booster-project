import refs from './utils/refs';
import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import validation from './utils/validation';
import countriesData from './data/countriesDataList';
import genresData from './data/classificationNameList';
import Pagination from 'tui-pagination';
import { onPagination } from './pagination';
const debounce = require('lodash.debounce');

const option = {
  totalElements: 60,
  visiblePages: 3,
  itemsPerPage: 20,
  centerAlign: true,
}

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
      validation.imageUrl(data)
      refs.gallery.innerHTML = cardListHbs(data)
      option.totalItems = apiService.totalElements;
      const pagination = new Pagination(refs.pagination, option);
      console.log(pagination);
      refs.pagination.addEventListener('click', onPagination);
    })
})





const onSearchInput = e => {
  if (!e.target.classList.contains('js-search-input')) {
    return
  }
  apiService.getEventsBySearchQuery(e.target.value).then(data => {
    if (!data) {
        refs.gallery.innerHTML = '<li><p class="message">Sorry, no events &#9785</p></li>';
        return
      }
    validation.imageUrl(data)
    refs.gallery.innerHTML = cardListHbs(data)
    e.target.value = ''
  })
}

refs.form.addEventListener('input', debounce(onSearchInput, 1000))

const stopFormReload = e => {
  e.preventDefault()
}

refs.form.addEventListener('submit', stopFormReload)