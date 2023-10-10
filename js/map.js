import { enableForms } from './form.js';
import { similarAnnouncements } from './data.js';
import { renderAnnouncement } from './popup.js';

const addressInput = document.querySelector('#address');

addressInput.value = 'LatLng(35.75097, 139.75845)';

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: 35.75097,
    lng: 139.75845,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52]
});

const mainPinMarker = L.marker(
  {
    lat: 35.75097,
    lng: 139.75845,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = evt.target.getLatLng();
});


const commonPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40]
});

similarAnnouncements.forEach(({author, offer, location}) => {
  const marker = L.marker({
    lat: location.lat,
    lng: location.lng,
  },
  {
    commonPinIcon
  }
  );

  marker
    .addTo(map)
    .bindPopup(renderAnnouncement({author, offer}));
});


export { map };
