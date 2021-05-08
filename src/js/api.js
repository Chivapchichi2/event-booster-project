const KEY = "c1xQ4GUaMnAePoI6UzGXPAXCsKa26y8D";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events";

// countryCode
// .json?
// console.log(`${BASE_URL}.json?size=20&apikey=${KEY}`);

// fetch(`${BASE_URL}.json?size=21&page=1&apikey=${KEY}`).then(r=>r.json()).then(console.log);
// fetch(`${BASE_URL}.json?size=21&page=1&apikey=${KEY}`)
//   .then(r => r.json())
//   .then(r => r['_embedded'].events[0].id)
//   .then(r => fetch(`${BASE_URL}/${r}.json?apikey=${KEY}`))
//   .then(r => r.json())
//   .then(console.log);
const apiService = {
  page: 1,
  size: 20,
  
}
