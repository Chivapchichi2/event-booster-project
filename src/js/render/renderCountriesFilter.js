import countriesListFilterHbs from '../../templates/countries-list.hbs'
import refs from '../utils/refs';
import countriesDataList from '../data/countriesDataList';

const countriesData = Object.values(countriesDataList)
const countriesListFilter = (countriesData) => {
  refs.countriesList.insertAdjacentHTML('beforeend', countriesListFilterHbs(countriesData))
}

 countriesListFilter(countriesData);
