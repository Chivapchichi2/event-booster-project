import refs from './utils/refs'
import apiService from './utils/serviceApi'
import cardListHbs from '../templates/card-list.hbs'
import validation from './utils/validation'

const onCountiesSearchClick = e => {
  apiService.getEventsByFilter(refs.genresList.value, refs.countriesList.value)
    .then(data => {
      if (!data) {
        refs.gallery.innerHTML = '<li><p class="message">Sorry, no events &#9785</p></li>';
        return
      }
      validation.imageUrl(data)
      refs.gallery.innerHTML = cardListHbs(data)
    })
}
refs.countriesList.addEventListener('change', onCountiesSearchClick)