/* import { getProperyType, getFeatures, getPhotos } from './popup.js';
import { createOffer, createAuthor } from './data.js';

const createCustomPopup = () => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const { title, address, price, rooms, guests, checkin, checkout, description, type, features, photos } = createOffer();
  const { avatar } = createAuthor();

  popupElement.querySelector('.popup__title').textContent = title; // заголовок
  popupElement.querySelector('.popup__text--address').textContent = address; // адрес
  popupElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`; // стоимость
  getProperyType(type); // добавляет тип жилья
  popupElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`; // количество гостей
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`; // время заезда и выезда
  getFeatures(features); // доступные удобства
  popupElement.querySelector('.popup__description').textContent = description; // описание
  getPhotos(photos); // добавляет фотографии
  popupElement.querySelector('.popup__avatar').src = avatar; // добавляет аватар

  return popupElement;
}; */
