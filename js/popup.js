import { createOffer, createAuthor } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAnnouncement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const announcementElement = similarAnnouncement.cloneNode(true);
const propertyType = {
  flat: 'flat',
  bungalow: 'bungalow',
  house: 'house',
  palace: 'palace',
  hotel: 'hotel'
};

// Функция, которая генерирует список всех доступных удобств в объявлении

const getFeatures = (features) => {
  const featuresContainer = announcementElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((feautureListItem) => {
    const isNecessary = features.some(
      (userFeature) => feautureListItem.classList.contains(`popup__feature--${userFeature}`),
    );

    if (!isNecessary) {
      feautureListItem.remove();
    }
  });
};

// Функция, которая добавляет фотографии в объявление

const getPhotos = (photos) => {
  const photoContainer = announcementElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';

  photos.forEach((photo) => {
    const image = document.createElement('img');
    image.src = photo;
    image.classList.add('popup__photo');
    image.style.width = '45px';
    image.style.height = '40px';
    photoContainer.appendChild(image);
  });
};

// Функция, которая добавляет тип жилья на страницу

const getProperyType = (type) => {
  switch (type) {
    case propertyType.flat:
      return 'Квартира';
    case propertyType.bungalow:
      return 'Бунгало';
    case propertyType.house:
      return 'Дом';
    case propertyType.palace:
      return 'Дворец';
    case propertyType.hotel:
      return 'Отель';
    default:
      return '';
  }
};

// Функция, которая добавляет объявление на страницу

const renderAnnouncement = () => {
  const { title, address, price, rooms, guests, checkin, checkout, description, type, features, photos } = createOffer();
  const { avatar } = createAuthor();

  announcementElement.querySelector('.popup__title').textContent = title; // заголовок
  announcementElement.querySelector('.popup__text--address').textContent = address; // адрес
  announcementElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`; // стоимость
  getProperyType(type); // добавляет тип жилья
  announcementElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`; // количество гостей
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`; // время заезда и выезда
  getFeatures(features); // доступные удобства
  announcementElement.querySelector('.popup__description').textContent = description; // описание
  getPhotos(photos); // добавляет фотографии
  announcementElement.querySelector('.popup__avatar').src = avatar; // добавляет аватар
  mapCanvas.appendChild(announcementElement);
};

export { renderAnnouncement };
