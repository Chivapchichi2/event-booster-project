import refs from './utils/refs';
import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import validation from './utils/validation';
import countriesData from './data/countriesDataList';
import genresData from './data/classificationNameList';
const debounce = require('lodash.debounce');


refs.form.addEventListener('change', e => {
  if (!e.target.classList.contains('select')) {
    return
  }
  let countyCode = validation.transformCountriesNameIntoCode(refs.countriesList.value, countriesData);
  let genreId = validation.transformGenreIntoId(refs.genresList.value, genresData);
  apiService.getEventsByFilter(genreId, countyCode)
    .then(data => {
      if (!data) {
        refs.gallery.innerHTML = '<li><p class="message">Sorry, no events in this country &#9785</p></li>';
        return
      }
      validation.imageUrl(data)
      refs.gallery.innerHTML = cardListHbs(data)
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