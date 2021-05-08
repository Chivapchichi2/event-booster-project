import apiService from './serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './refs';

apiService.getWorldUpcomingEvents().then(data => {
  const markup = cardListHbs(data);
  refs.cardList.insertAdjacentHTML('beforeend', markup);
});
