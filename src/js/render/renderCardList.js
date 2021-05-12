import apiService from '../utils/serviceApi';
import cardListHbs from '../../templates/card-list.hbs';
import refs from '../utils/refs';
import validation from '../utils/validation';

apiService.getWorldUpcomingEvents().then(data => {
  validation.location(data);
  validation.imageUrl(data);
  const markup = cardListHbs(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}).catch(console.log);
