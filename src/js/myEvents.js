import databaseApi from './utils/firebaseApi';
import refs from './utils/refs';

refs.userData.addEventListener('click', (e) => {
  if (e.target === document.getElementById('user-events')) {
    if (refs.registrationBtn.dataset.sign === 'in') {
      return refs.registrationBtn.click();
    }
    refs.form.classList.add('is-hidden');
    
    renderMyEventsPage().catch(console.log);
    
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
    })
}

export { saveEvent }
