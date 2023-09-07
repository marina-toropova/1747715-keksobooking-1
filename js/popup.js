import { createOffer, createAuthor } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');

const renderAnnouncement = () => {
  const similarAnnouncement = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const { title, address, price, rooms, guests, checkin, checkout, features, description, photos } = createOffer();
  let { type } = createOffer();
  const announcementElement = similarAnnouncement.cloneNode(true);
  announcementElement.querySelector('.popup__title').textContent = title;
  announcementElement.querySelector('.popup__text--address').textContent = address;
  announcementElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;

  switch (type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalow':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    case 'hotel':
      type = 'Отель';
      break;
  }

  announcementElement.querySelector('.popup__type').textContent = type;
  announcementElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

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

  announcementElement.querySelector('.popup__description').textContent = description;

  const userPhotos = photos;
  const photoContainer = announcementElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';

  for (let i = 0; i < userPhotos.length; i++) {
    const photo = document.createElement('img');
    photo.src = userPhotos[i];
    photo.classList.add('popup__photo');
    photo.style.width = '45px';
    photo.style.height = '40px';
    photoContainer.appendChild(photo);
  }

  const { avatar } = createAuthor();
  announcementElement.querySelector('.popup__avatar').src = avatar;

  return mapCanvas.appendChild(announcementElement);
};

export { renderAnnouncement };
