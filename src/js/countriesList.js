import refs from './refs'
import apiService from './serviceApi'
import cardListHbs from '../templates/card-list.hbs'
import validation from './validation'

const onCountiesSearchClick = e => {
  apiService.getEventsByCountryName(refs.countriesList.value)
    .then(data => {
      if (!data) {
        refs.gallery.innerHTML = 'sorry no events';
        return
      }
      validation.imageUrl(data)
      refs.gallery.innerHTML = cardListHbs(data)
    })
}
refs.countriesList.addEventListener('click', onCountiesSearchClick)