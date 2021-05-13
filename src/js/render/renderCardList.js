import apiService from '../utils/serviceApi';
import cardListHbs from '../../templates/card-list.hbs';
import validation from '../utils/validation';
import { startPagination, option, onRenderPage } from '../pagination';
const debounce = require('lodash.debounce');

if (window.innerWidth > 767 && window.innerWidth < 1280) {
  apiService.perPage++;
  option.itemsPerPage++;
}

apiService.getWorldUpcomingEvents().then(data => {
  validation.galleryRender(data, cardListHbs);
  startPagination();
}).catch(console.log);

window.addEventListener('resize', debounce(e => {
  if (e.target.innerWidth > 767 && e.target.innerWidth < 1280) {
    if (!validation.checkChangePerPage(apiService, 21)) {
      apiService.perPage++;
      option.itemsPerPage++;
      onRenderPage(apiService.page);
      startPagination();
    }
    return;
  }

  if (!validation.checkChangePerPage(apiService, 20)) {
      apiService.perPage--;
      option.itemsPerPage--;
      onRenderPage(apiService.page);
      startPagination();
      return;
  }
}, 300));
