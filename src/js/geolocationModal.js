import refs from "./utils/refs";
import { Loader } from "@googlemaps/js-api-loader"
let map;
let marker;
const onLocationOnCardClick = e => {
  if (!e.target.classList.contains('js-geolocation-btn')) {
    return
  }
const loader = new Loader({
  apiKey: "AIzaSyBoaAG53f8AEmf3WVHR7j3I-ALQmB5xpd0",
});
loader.load().then(() => {
  const latLng = {
    lat: +e.target.dataset.latitude,
    lng: +e.target.dataset.longitude
  }
  map = new google.maps.Map(document.getElementById("map"), {
    center: latLng,
    zoom: 15,
  });
  marker = new google.maps.Marker({
    position: latLng,
    title:"Let's Rock!!!"
  });
  marker.setMap(map);
});
  refs.geoModalBackdrop.classList.remove('is-hidden')
}


const onGeoModalClick = e => {
 
  if (e.target.classList.contains('js-geolocation-backdrop')) {
   
    refs.geoModalBackdrop.classList.add('is-hidden')
  } else {
    return
  }
}
const onCloseGeoModalByEscKeydown = e => {
if (e.code === 'Escape') {
    refs.geoModalBackdrop.classList.add('is-hidden')
  }
}


window.addEventListener('keydown', onCloseGeoModalByEscKeydown);
refs.geoModalBackdrop.addEventListener('click', onGeoModalClick);
refs.gallery.addEventListener('click', onLocationOnCardClick  )