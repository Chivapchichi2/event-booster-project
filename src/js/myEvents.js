import databaseApi from './utils/firebaseApi';
import refs from './utils/refs';

refs.userData.addEventListener('click', (e) => {
  if (e.target === document.getElementById('user-events')) {
    if (e.target.textContent === 'Get home') {
      return refs.logo.click();
    }
    if (refs.registrationBtn.dataset.sign === 'in') {
      return refs.registrationBtn.click();
    }
    refs.form.classList.replace('animate__bounceInDown', 'animate__bounceOutUp');
    setTimeout(() => {
      refs.form.classList.add('is-hidden');
      refs.heroTitle.innerHTML = 'My &nbsp; Events';
      e.target.textContent = 'Get home';
     }, 1000);
    
    renderMyEventsPage()
    
}
});

function saveEvent(e) {
  const id =  e.target.closest('.card-img-div').dataset.id;
  const event = e.target.closest('.card-item').innerHTML;
  const eventData = `<li class="card-item animate__animated animate__zoomInDown">${event}</li>`;
  databaseApi.writeUserEvent(id, eventData);
}

function renderMyEventsPage() {
   databaseApi.readUserEvents().then(data => {
      refs.gallery.innerHTML = Object.values(data).join('')
    }).catch(console.log);
}
async function getAndCheckUserEvents(data) {
  const userEvents = await databaseApi.readUserEvents();
  if (!userEvents) {
    data.forEach(i => {
      i.icon = '9734';
      i.iconStatus = 'some-event';
    })
    return data;
  }
  const userEventsId = Object.keys(userEvents);
  data.forEach(i => {
     if (userEventsId.includes(i.id)) {
       i.icon = '9733';
       i.iconStatus = 'my-event';
     } else {
       i.icon = '9734';
       i.iconStatus = 'some-event';
     }
  })
  return data;
}

export { saveEvent, getAndCheckUserEvents }
