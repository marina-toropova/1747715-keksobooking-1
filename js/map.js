import { enableForm, enableFilter, disableFilter } from './form.js';
import { renderAnnouncement, SIMILAR_ANNOUNCEMENTS_COUNT } from './popup.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { typeOfHousingSelect, showByTypeOfHousing, priceSelect, showByPrice, roomsCountSelect, showByRoomsCount, guestsCountSelect, showByGuestsCount } from './filter.js';

const MAP = L.map('map-canvas');
const ADDRESS_INPUT = document.querySelector('#address');
const DEFAULT_LATITUDE = 35.68700;
const DEFAULT_LONGITUDE = 139.753475;
const SET_VIEW_LONGITUDE = 139.753490;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52]
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
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

ADDRESS_INPUT.value = mainPinMarker.getLatLng();

const setLatLng = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  });
  ADDRESS_INPUT.value = mainPinMarker.getLatLng();
};

const loadMap = () => {
  MAP.on('load', () => {
    enableForm();
  })
    .setView({
      lat: DEFAULT_LATITUDE,
      lng: SET_VIEW_LONGITUDE,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);

  mainPinMarker.addTo(MAP);

  mainPinMarker.on('moveend', (evt) => {
    ADDRESS_INPUT.value = evt.target.getLatLng();
  });
};

const loadData = () => {
  MAP.eachLayer((layer) => {
    if (layer instanceof L.LayerGroup && layer !== mainPinMarker) {
      MAP.removeLayer(layer);
    }
  });

  getData()
    .then((similarAnnouncements) => {
      const filteredAnnouncements = similarAnnouncements
        .slice()
        .filter(showByTypeOfHousing)
        .filter(showByPrice)
        .filter(showByRoomsCount)
        .filter(showByGuestsCount)
        .slice(0, SIMILAR_ANNOUNCEMENTS_COUNT);

      const markersLayer = L.layerGroup();

      filteredAnnouncements.forEach(({ location }, index) => {
        const marker = L.marker({
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon: commonPinIcon
        });

        const announcementElements = renderAnnouncement(filteredAnnouncements);
        const announcementElement = announcementElements[index];
        const popup = L.popup()
          .setContent(announcementElement);

        marker
          .addTo(markersLayer)
          .bindPopup(popup);
      });

      markersLayer.addTo(MAP);
    })
    .then(enableFilter)
    .catch((err) => {
      disableFilter();
      showAlert(err.message);
    });
};

typeOfHousingSelect.addEventListener('change', () => {
  loadData();
});

priceSelect.addEventListener('change', () => {
  loadData();
});

roomsCountSelect.addEventListener('change', () => {
  loadData();
});

guestsCountSelect.addEventListener('change', () => {
  loadData();
});

export { loadMap, loadData, setLatLng, MAP };
