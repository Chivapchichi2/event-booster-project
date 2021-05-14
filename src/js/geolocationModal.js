import refs from "./utils/refs";
import geolocationHbs from '../templates/geolocation.hbs';


const onLocationOnCardClick = e => {
  if (!e.target.classList.contains('js-geolocation-btn')) {
    return
  }
  const location = {
    name: e.target.dataset.name,
    location: e.target.dataset.latitude.concat(',')+e.target.dataset.longitude,
  }
  console.log(location.location);
  console.log(location.name);
  refs.geoModal.innerHTML = geolocationHbs(location);
  refs.geoModalBackdrop.classList.remove('is-hidden')
}
const onGeoModalClick = e => {
  if (e.target.nodeName === 'IFRAME') {
    return
  }
  refs.geoModalBackdrop.classList.add('is-hidden')
}
const onCloseGeoModalByEscKeydown = e => {
if (e.code === 'Escape') {
    refs.geoModalBackdrop.classList.add('is-hidden')
  }
}

window.addEventListener('keydown', onCloseGeoModalByEscKeydown);
refs.geoModalBackdrop.addEventListener('click', onGeoModalClick);
refs.gallery.addEventListener('click', onLocationOnCardClick);