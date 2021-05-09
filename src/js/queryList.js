import refs from './utils/refs'
import apiService from './utils/serviceApi'
import cardListHbs from '../templates/card-list.hbs'
import validation from './utils/validation'

const debounce = require('lodash.debounce');

const onSearchInput = (e) => {
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


refs.queryList.addEventListener('input', debounce(onSearchInput, 300))