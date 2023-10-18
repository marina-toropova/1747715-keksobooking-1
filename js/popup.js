const propertyType = {
  flat: 'flat',
  bungalow: 'bungalow',
  house: 'house',
  palace: 'palace',
  hotel: 'hotel'
};

// Функция, которая генерирует список всех доступных удобств в объявлении

const getFeatures = (features = [], announcementElement) => {
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

const getPhotos = (photos = [], announcementElement) => {
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

// Функция, которая заполняет объявление

const renderAnnouncement = (similarAnnouncements) => {
  const announcements = [];

  similarAnnouncements.forEach(({ author, offer }) => {
    const similarAnnouncement = document.querySelector('#card').content.querySelector('.popup');
    const announcementElement = similarAnnouncement.cloneNode(true);
    announcementElement.querySelector('.popup__title').textContent = offer.title;
    announcementElement.querySelector('.popup__text--address').textContent = offer.address;
    announcementElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    announcementElement.querySelector('.popup__type').textContent = getProperyType(offer.type);
    announcementElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    getFeatures(offer.features, announcementElement);
    announcementElement.querySelector('.popup__description').textContent = offer.description;
    getPhotos(offer.photos, announcementElement);
    announcementElement.querySelector('.popup__avatar').src = author.avatar;

    announcements.push(announcementElement);
  });

  return announcements;
};

export { renderAnnouncement };
