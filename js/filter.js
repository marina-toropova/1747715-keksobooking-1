/* const typeOfHousingSelect = document.querySelector('[name="housing-type"]');
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
}; */

const typeOfHousingSelect = document.querySelector('[name="housing-type"]');
const priceSelect = document.querySelector('[name="housing-price"]');

const DEFAULT_OPTION_VALUE = 'any';

const showByTypeOfHousing = ({offer}) => {
  if (typeOfHousingSelect.value === DEFAULT_OPTION_VALUE) {
    return true;
  } return offer.type === typeOfHousingSelect.value;
};

const showByPrice = ({offer}) => {
  if (priceSelect.value === DEFAULT_OPTION_VALUE) {
    return true;
  }

  if (priceSelect.value === 'middle') {
    return offer.price >= 10000 && offer.price <= 50000;
  }

  if (priceSelect.value === 'low') {
    return offer.price < 10000;
  }

  if (priceSelect.value === 'high') {
    return offer.price > 50000;
  }
};

export { showByTypeOfHousing, showByPrice, typeOfHousingSelect, priceSelect };
