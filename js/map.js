import { enableForm, enableFilter, disableFilter } from './form.js';
import { renderAnnouncement, SIMILAR_ANNOUNCEMENTS_COUNT } from './popup.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { showByTypeOfHousing, showByPrice, showByRoomsCount, showByGuestsCount, showByFeatures } from './filter.js';

const DEFAULT_LATITUDE = 35.69126;
const DEFAULT_LONGITUDE = 139.75347;
const SET_VIEW_LONGITUDE = 139.75349;

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');
const mapForm = document.querySelector('.map__filters');

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

const roundLatLng = () => {
  const mainPinMarkerLatLng = mainPinMarker.getLatLng();
  const mainPinMarkerLat = mainPinMarkerLatLng.lat.toFixed(5);
  const mainPinMarkerLng = mainPinMarkerLatLng.lng.toFixed(5);
  const addressInputValue = `LatLng(${mainPinMarkerLat}, ${mainPinMarkerLng})`;
  addressInput.value = addressInputValue;
  return addressInput.value;
};

addressInput.value = roundLatLng();

const setLatLng = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  });
  addressInput.value = roundLatLng();
};

const loadMap = () => {
  map.on('load', () => {
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
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', () => {

    addressInput.value = roundLatLng();
  });
};

const loadData = () => {
  map.eachLayer((layer) => {
    if (layer instanceof L.LayerGroup && layer !== mainPinMarker) {
      map.removeLayer(layer);
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
        .sort(showByFeatures)
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

      markersLayer.addTo(map);
    })
    .then(enableFilter)
    .catch((err) => {
      disableFilter();
      showAlert(err.message);
    });
};

const debouncedLoadData = debounce(loadData);

mapForm.addEventListener('change', (event) => {
  if (event.target.matches('SELECT, INPUT')) {
    debouncedLoadData();
  }
});

export { loadMap, loadData, setLatLng, map };
