import { getSimilarAnnouncements, createOffer, createAuthor } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAnnouncement = document.querySelector('#card')
  .content
  .querySelector('.popup');

/* const similarListFragment = document.createDocumentFragment(); */

const offer = createOffer();

// const author = createAuthor();
// const announcement = getSimilarAnnouncements();

const announcementElement = similarAnnouncement.cloneNode(true);
announcementElement.querySelector('.popup__title').textContent = offer.title;
announcementElement.querySelector('.popup__text--address').textContent = offer.address;
announcementElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;


switch (offer.type) {
  case 'flat':
    offer.type = 'Квартира';
    break;
  case 'bungalow':
    offer.type = 'Бунгало';
    break;
  case 'house':
    offer.type = 'Дом';
    break;
  case 'palace':
    offer.type = 'Дворец';
    break;
  case 'hotel':
    offer.type = 'Отель';
    break;
}
announcementElement.querySelector('.popup__type').textContent = offer.type;

announcementElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;


const userFeatures = offer.features;
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

announcementElement.querySelector('.popup__description').textContent = offer.description;

const photos = offer.photos;
const photoContainer = announcementElement.querySelector('.popup__photos');
photoContainer.innerHTML = '';

for (let i = 0; i < photos.length; i++) {
  const photo = document.createElement('img');
  photo.src = photos[i];
  photo.classList.add('popup__photo');
  photo.style.width = '45px';
  photo.style.height = '40px';
  photoContainer.appendChild(photo);
}

const author = createAuthor();
console.log(author);
announcementElement.querySelector('.popup__avatar').src = author.avatar;


mapCanvas.appendChild(announcementElement);

