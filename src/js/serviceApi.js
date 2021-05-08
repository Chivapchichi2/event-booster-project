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
   return fetch(url).then(r=>r.json())
  },
  getEventsByCountryName(countryName) {
    const url = `${BASE_URL}events.json?page=${this.page}&size=${this.perPage}&countryCode=${co}apikey=${KEY}`
  }
}

