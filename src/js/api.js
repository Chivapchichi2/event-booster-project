const KEY = "c1xQ4GUaMnAePoI6UzGXPAXCsKa26y8D";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=lp&apikey=c1xQ4GUaMnAePoI6UzGXPAXCsKa26y8D").then(r=>r.json()).then(console.log);