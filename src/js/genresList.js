import refs from './utils/refs'
import apiService from './utils/serviceApi'
import cardListHbs from '../templates/card-list.hbs'
import validation from './utils/validation'


refs.genresList.addEventListener('change', e => {
  apiService.getEventsByFilter(refs.genresList.value, refs.countriesList.value)
    .then(data => {
      if (!data) {
        refs.gallery.innerHTML = '<li><p class="message">Sorry, no events in this country &#9785</p></li>';
        return
      }
      validation.imageUrl(data)
      refs.gallery.innerHTML = cardListHbs(data)
    })
})