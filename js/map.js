import { enableForms } from './form.js';
import { similarAnnouncements } from './data.js';
import { renderAnnouncement } from './popup.js';

const map = L.map('map-canvas');

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

const commonPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40]
});

const addressInput = document.querySelector('#address');

addressInput.value = 'LatLng(35.75097, 139.75845)';

const loadMap = () => {
  map.on('load', () => {
    enableForms();
  })
    .setView({
      lat: 35.75090,
      lng: 139.75845,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = evt.target.getLatLng();
  });
};

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

export { loadMap };
