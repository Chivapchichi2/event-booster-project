import countriesListFilterHbs from '../templates/countries-list.hbs'
import refs from './refs';
import countriesDataList from '../js/countriesDataList';

const countriesData = Object.values(countriesDataList)
const countriesListFilter = (countriesData) => {
  refs.countriesList.insertAdjacentHTML('beforeend', countriesListFilterHbs(countriesData))
}

countriesListFilter(countriesData)