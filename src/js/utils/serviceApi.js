import countriesData from '../data/countriesDataList'
import genresData from '../data/classificationNameList'
const KEY = "c1xQ4GUaMnAePoI6UzGXPAXCsKa26y8D";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";
 

export default {
  page: 1,
  perPage: 20,
  getWorldUpcomingEvents() {
    const url = `${BASE_URL}events.json?page=${this.page}&size=${this.perPage}&apikey=${KEY}`;
    return fetch(url).then(r => r.json()).then(r => {
      const data = r._embedded.events
      return data
    });
  },
  getEventById(id) {
    const url = `${BASE_URL}events/${id}.json?apikey=${KEY}`;
    return fetch(url).then(r => r.json())
  },
  getEventsBySearchQuery(searchQuery) {
    const url = `${BASE_URL}events.json?keyword=${searchQuery}&apikey=${KEY}`;
    return fetch(url).then(r => r.json()).then(r => {
      
      const data = r._embedded?.events
      return data
    });
  },
  getEventsByFilter(genre, countryName) {
    let genreId = '';
    let countryCode = '';
    countriesData.forEach(i => {
      if (i.name === countryName) {
        countryCode = i.code;
        
      }
    })
    genresData.forEach(i => {
      if (i.name === genre) {
        genreId = i.id
      }
    })
    
    const url = `${BASE_URL}events.json?classificationId=${genreId}&countryCode=${countryCode}&apikey=${KEY}`;
    return fetch(url).then(r => r.json()).then(r => {
      const data = r._embedded?.events
      return data
    })
  },
  incrementPage() {
    this.page += 1;
  },
  decrementPage() {
    this.page -= 1;
  },
  resetPage() {
    this.page = 1;
  },
  changeSizeSetting(val) {
    this.perPage = val;
  },
  resetSizeSettings() {
    this.perPage = 20;
  },
};

