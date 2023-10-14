import { priceInput, typeOfHousingSelect, typeOfHousingOptions } from './validator.js';

const sliderElement = document.querySelector('.ad-form__slider');

const getMinPrice = () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  priceInput.min = minPrice;
  return minPrice;
};

noUiSlider.create(sliderElement, {
  range: {
    min: getMinPrice(),
    max: 50000,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('change', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

typeOfHousingSelect.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: getMinPrice(),
      max: 50000
    }
  });
});

export { sliderElement };
