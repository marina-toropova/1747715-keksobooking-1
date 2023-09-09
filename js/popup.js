import { createOffer, createAuthor } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAnnouncement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const announcementElement = similarAnnouncement.cloneNode(true);

// Функция, которая генерирует список всех доступных удобств в объявлении

const getFeatures = () => {
  const { features } = createOffer();
  const userFeatures = features;
  const featuresContainer = announcementElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((feautureListItem) => {
    const isNecessary = userFeatures.some(
      (userFeature) => feautureListItem.classList.contains(`popup__feature--${userFeature}`),
    );

    if (!isNecessary) {
      feautureListItem.remove();
    }
  });
};

// Функция, которая добавляет фотографии в объявление

const getPhotos = () => {
  const { photos } = createOffer();
  const userPhotos = photos;
  const photoContainer = announcementElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';

  userPhotos.forEach((userPhoto) => {
    const photo = document.createElement('img');
    photo.src = userPhoto;
    photo.classList.add('popup__photo');
    photo.style.width = '45px';
    photo.style.height = '40px';
    photoContainer.appendChild(photo);
  });
};

// Функция, которая добавляет тип жилья на страницу

const getProperyType = () => {
  let { type } = createOffer();
  const propertyType = {
    flat: 'flat',
    bungalow: 'bungalow',
    house: 'house',
    palace: 'palace',
    hotel: 'hotel'
  };
  switch (type) {
    case propertyType.flat:
      type = 'Квартира';
      break;
    case propertyType.bungalow:
      type = 'Бунгало';
      break;
    case propertyType.house:
      type = 'Дом';
      break;
    case propertyType.palace:
      type = 'Дворец';
      break;
    case propertyType.hotel:
      type = 'Отель';
      break;
  }

  announcementElement.querySelector('.popup__type').textContent = type;
};

// Функция, которая добавляет объявление на страницу

const renderAnnouncement = () => {

  const { title, address, price, rooms, guests, checkin, checkout, description } = createOffer();
  const { avatar } = createAuthor();

  announcementElement.querySelector('.popup__title').textContent = title; // заголовок
  announcementElement.querySelector('.popup__text--address').textContent = address; // адрес
  announcementElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`; // стоимость
  getProperyType(); // добавляет тип жилья
  announcementElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`; // количество гостей
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`; // время заезда и выезда
  getFeatures(); // доступные удобства
  announcementElement.querySelector('.popup__description').textContent = description; // описание
  getPhotos(); // добавляет фотографии
  announcementElement.querySelector('.popup__avatar').src = avatar; // добавляет аватар
  mapCanvas.appendChild(announcementElement);
};

export { renderAnnouncement };
