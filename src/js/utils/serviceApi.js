const KEY = 'c1xQ4GUaMnAePoI6UzGXPAXCsKa26y8D';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default {
  genresId: '',
  searchQuery: '',
  countryCode: '',
  page: 1,
  perPage: 20,
  totalElements: null,
  galleryStatus: 'ByUpcoming',  
  getWorldUpcomingEvents() {
    this.galleryStatus = 'ByUpcoming';

    const url = `${BASE_URL}events.json?page=${this.page}&size=${this.perPage}&sort=id,asc&apikey=${KEY}`;
    return fetch(url)
      .then(r => r.json())
      .then(r => {
        this.totalElements = r.page.totalElements;
        const data = r._embedded.events;        
        return data;
      });
  },
  getEventById(id) {
    this.galleryStatus = 'ById';
    const url = `${BASE_URL}events/${id}.json?sort=id,asc&apikey=${KEY}`;
    return fetch(url).then(r => r.json());
  },
  getEventsBySearchQuery(searchQuery) {
    this.galleryStatus = 'BySearch';
    const url = `${BASE_URL}events.json?keyword=${searchQuery}&page=${this.page}&size=${this.perPage}&sort=id,asc&apikey=${KEY}`;
    return fetch(url)
      .then(r => r.json())
      .then(r => {
        this.totalElements = r.page.totalElements;
        const data = r._embedded?.events;
        return data;
      });
  },
  getEventsByFilter(genreId, countryCode) {
    this.galleryStatus = 'ByFilter';
    const url = `${BASE_URL}events.json?classificationId=${genreId}&page=${this.page}&size=${this.perPage}&countryCode=${countryCode}&sort=id,asc&apikey=${KEY}`;
    return fetch(url)
      .then(r => r.json())
      .then(r => {       
        this.totalElements = r.page.totalElements;
        const data = r._embedded?.events;
        return data;
      })
  },
  incrementPage() {
    this.page += 1;
  },
  decrementPage() {
    if (this.page === 1) {
      return
    }
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
