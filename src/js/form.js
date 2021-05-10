import refs from './utils/refs';
import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import validation from './utils/validation';
import countriesData from './data/countriesDataList';
import genresData from './data/classificationNameList';

refs.form.addEventListener('change', e => {
  e.preventDefault();
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