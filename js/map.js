import { enableForm, enableFilter } from './form.js';
import { renderAnnouncement } from './popup.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52]
});

const mainPinMarker = L.marker(
  {
    lat: 35.68700,
    lng: 139.753475,
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

addressInput.value = 'LatLng(35.68700, 139.753475)';

const loadMap = () => {
  map.on('load', () => {
    enableForm();
  })
    .setView({
      lat: 35.68700,
      lng: 139.753490,
    }, 14);

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

const loadData = () => {
  getData()
    .then((similarAnnouncements) => {
    similarAnnouncements.forEach(({ location }, index) => {
      const marker = L.marker({
        lat: location.lat,
        lng: location.lng,
      },
      {
        commonPinIcon
      });

      const announcementElements = renderAnnouncement(similarAnnouncements);
      const announcementElement = announcementElements[index];
      const popup = L.popup()
        .setContent(announcementElement);

      marker
        .addTo(map)
        .bindPopup(popup);
    });
    }).then(enableFilter())
    .catch((err) => {
      showAlert(err.message);
    });
};

export { loadMap, loadData };
