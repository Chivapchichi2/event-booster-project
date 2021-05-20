const KEY = 'fasPDgI3OOgzxAQkISGmqFAQgM8mmOdU';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default {
  genresId: '',
  searchQuery: '',
  countryCode: '',
  page: 1,
  perPage: 20,
  totalElements: null,
  async getEventsData() {
    const url = `${BASE_URL}events.json?keyword=${this.searchQuery}&classificationId=${this.genresId}&countryCode=${this.countryCode}&page=${this.page}&size=${this.perPage}&sort=id,asc&apikey=${KEY}`;
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
  async getEventById(id) {
    const url = `${BASE_URL}events/${id}.json?sort=id,asc&apikey=${KEY}`;
     try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
  resetPage() {
    this.page = 1;
  },
  setPage(page) {
   this.page = page;
  },
};
