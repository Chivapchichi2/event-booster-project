import apiService from '../utils/serviceApi';
import validation from '../utils/validation';
import { startPagination, option, render } from '../pagination';
const debounce = require('lodash.debounce');

if (window.innerWidth > 767 && window.innerWidth < 1280) {
  apiService.perPage++;
  option.itemsPerPage++;
}

window.addEventListener('resize', debounce(e => {
  if (e.target.innerWidth > 767 && e.target.innerWidth < 1280) {
    if (!validation.checkChangePerPage(apiService, 21)) {
      apiService.perPage++;
      option.itemsPerPage++;
      render();
      startPagination();
    }
    return;
  }

  if (!validation.checkChangePerPage(apiService, 20)) {
      apiService.perPage--;
      option.itemsPerPage--;
      render();
      startPagination();
      return;
  }
}, 300));

validation.heroTitleAnimation();
