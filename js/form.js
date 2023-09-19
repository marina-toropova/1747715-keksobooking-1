const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const adFormInputs = adForm.querySelectorAll('input');
const mapFormInputs = mapForm.querySelectorAll('input');
const adFormSelects = adForm.querySelectorAll('select');
const mapFormSelects = mapForm.querySelectorAll('select');
const adFormTextAreas = adForm.querySelectorAll('textarea');
const adFormButtons = adForm.querySelectorAll('button');

const setDisabledInput = () => {
  adFormInputs.forEach((input) => {
    input.disabled = true;
  });
  mapFormInputs.forEach((input) => {
    input.disabled = true;
  });
  adFormSelects.forEach((select) => {
    select.disabled = true;
  });
  mapFormSelects.forEach((select) => {
    select.disabled = true;
  });
  adFormTextAreas.forEach((textarea) => {
    textarea.disabled = true;
  });
  adFormButtons.forEach((button) => {
    button.disabled = true;
  });
};

/* function onFilterChange (evt) {
  if (evt.target.nodeName === 'INPUT' || evt.target.nodeName === 'SELECT') {
    evt.target.disabled = true;
  }
} */

const setInactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  setDisabledInput(adForm);
  setDisabledInput(mapForm);
};

export { setInactiveForm };


