const ALERT_SHOW_TIME = 5000;

const typeOfHousingSelect = document.querySelector('[name="housing-type"]');
const priceSelect = document.querySelector('[name="housing-price"]');
const roomsCountSelect = document.querySelector('[name="housing-rooms"]');
const guestsCountSelect = document.querySelector('[name="housing-guests"]');
const featuresInputs = document.querySelectorAll('[name="features"]');
const featureWifiInput = document.querySelector('[value="wifi"]');
const featureDishWasherInput = document.querySelector('[value="dishwasher"]');
const featureParkingInput = document.querySelector('[value="parking"]');
const featureWasherInput = document.querySelector('[value="washer"]');
const featureElevatorInput = document.querySelector('[value="elevator"]');
const featureConditionerInput = document.querySelector('[value="conditioner"]');

// Функция, которая создает сообщение о неуспешной отправке формы

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция, которая сортирует массив с данными с сервера

const getAnnouncementRank = ({ offer }) => {


  let rank = 0;

  if (offer.type === typeOfHousingSelect.value) {
    rank += 2;
  }

  const getPriceRank = () => {
    if (priceSelect.value === 'any') {
      rank += 2;
    }
    if (priceSelect.value === 'low' && offer.price < 10000) {
      rank += 2;
    }
    if (priceSelect.value === 'middle' && offer.price > 10000 && offer.price < 50000) {
      rank += 2;
    }
    if (priceSelect.value === 'high' && offer.price > 50000) {
      rank += 2;
    }
    return rank;
  };

  getPriceRank();

  if (offer.rooms === roomsCountSelect.value) {
    rank += 2;
  }

  if (offer.guests === guestsCountSelect.value) {
    rank += 2;
  }

  if (offer.features) {
    offer.features.forEach((feature) => {
      featuresInputs.forEach((featureInput) => {
        if (feature === featureInput.value) {
          rank += 1;
        }
      });
    });
  }

  const getFeaturesRank = (array, feautureInput) => {
    if (array === feautureInput.value) {
      rank += 1;
    }
  };

  getFeaturesRank(offer.features, featureWifiInput);
  getFeaturesRank(offer.features, featureParkingInput);
  getFeaturesRank(offer.features, featureWasherInput);
  getFeaturesRank(offer.features, featureElevatorInput);
  getFeaturesRank(offer.features, featureConditionerInput);
  getFeaturesRank(offer.features, featureDishWasherInput);

  return rank;
};

const compareAnnoucement = (announcementA, announcementB) => {
  const rankA = getAnnouncementRank(announcementA);
  const rankB = getAnnouncementRank(announcementB);

  return rankB - rankA;
};

/* const setEyesClick = (cb) => {
  typeOfHousingSelect.addEventListener('click', (evt) => {
    evt.target.style.fill = randomColor;
    eyesColorInput.value = randomColor;
    cb();
  });
};

const setCoatClick = (cb) => {
  coatColorElement.addEventListener('click', (evt) => {
    const randomColor = getRandomArrayElement(Color.COATS);
    evt.target.style.fill = randomColor;
    coatColorInput.value = randomColor;
    cb();
  });
}; */

export { showAlert, compareAnnoucement };
