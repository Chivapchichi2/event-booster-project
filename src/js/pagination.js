import apiService from './utils/serviceApi';
import cardListHbs from '../templates/card-list.hbs';
import refs from './utils/refs';
import validation from './utils/validation';
import Pagination from 'tui-pagination';
import onScrollToTop from './toTop';
import { getAndCheckUserEvents } from './myEvents';

function render() {
  apiService.getEventsData()
    .then(r => {
      if (!r?._embedded?.events) {
        return
      }
      else {
        return r._embedded.events;
      }
    })
    .then(getAndCheckUserEvents)
    .then(data => {
      validation.galleryRender(data, cardListHbs);
    })
    .catch(console.log);
}

const option = {
  totalItems: 980,
  visiblePages: 3,
  itemsPerPage: 20,
  centerAlign: true,
}

function startPagination() {
  option.totalItems = apiService.totalElements < 980 ? apiService.totalElements : 980;
  const pagination = new Pagination(refs.pagination, option);
  pagination.on('beforeMove', function(e) {
    apiService.setPage(e.page);
    render();
    onScrollToTop();
  })
}
export { startPagination , option, render}
