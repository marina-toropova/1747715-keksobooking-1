const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const setDisabledInput = (form) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const buttons = form.querySelectorAll('button');

  [...inputs, ...selects, ...textareas, ...buttons].forEach((element) => {
    element.disabled = true;
  });
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  setDisabledInput(adForm);
  setDisabledInput(mapForm);
};

export { disableForm };


