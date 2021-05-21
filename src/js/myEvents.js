import databaseApi from './utils/firebaseApi';
import refs from './utils/refs';
import validation from './utils/validation';
import resetTheme from './utils/theme';


refs.userData.addEventListener('click', (e) => {
  if (e.target === document.getElementById('user-events')) {
    if (e.target.textContent === 'Get home') {
      return refs.logo.click();
    }
  
    if (refs.registrationBtn.firstElementChild.dataset.sign === 'in') {
      return refs.registrationBtn.click();
    }
    refs.mapContainer.style.display = 'none';
    refs.form.classList.replace('inDown', 'outUp');
    e.target.textContent = 'Get home';
    resetTheme();
    refs.theme.classList.add('user-profile-theme');
    setTimeout(() => {
      refs.form.classList.add('is-hidden');
      refs.heroTitle.innerHTML = 'My &nbsp; Events';
      
     }, 1000);
    
    renderMyEventsPage()
    
}
});

function saveEvent(e, id) {
  const event = e.target.closest('.card-item').innerHTML;
  const eventData = `<li class="card-item animate__animated animate__zoomInDown">${event}</li>`;
  databaseApi.writeUserEvent(id, eventData);
}

function deleteEvent(id) {
  databaseApi.deleteUserEvent(id);
}

function renderMyEventsPage() {
  databaseApi.readUserEvents().then(data => {
    if (!data) {
      validation.noData();
      return
    }
    refs.gallery.innerHTML = Object.values(data).join('');
    refs.pagination.innerHTML = '';
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

function changeIconBtnAddAndMyEventData(e) {
  const id = e.target.closest('.card-img-div').dataset.id;
  if (e.target.classList.contains('some-event')) {
    e.target.innerHTML = '&#9733;';
    e.target.classList.replace('some-event', 'my-event');

    saveEvent(e, id);
    return
  }
  e.target.innerHTML = '&#9734;';
  e.target.classList.replace('my-event', 'some-event');

  deleteEvent(id);
  if (document.getElementById('user-events').textContent === 'Get home') {
    e.target.closest('.card-item').style.display = 'none';
    
  }
}

export { changeIconBtnAddAndMyEventData, getAndCheckUserEvents }
