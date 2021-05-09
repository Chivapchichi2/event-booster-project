import apiService from './serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './refs';
import validation from './validation';

refs.logo.addEventListener('click', onLogoClick);

function onLogoClick() {
  apiService.getWorldUpcomingEvents().then(data => {
    validation.imageUrl(data);
    const markup = cardListHbs(data);

    refs.cardList.insertAdjacentHTML('beforeend', markup);
  });
}
