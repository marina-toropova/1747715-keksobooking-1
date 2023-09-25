const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Функция, которая перводит поля ввода, кнопки и текстовые поля форм в НЕактивное состояние

const setDisabledInput = (form) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const buttons = form.querySelectorAll('button');

  [...inputs, ...selects, ...textareas, ...buttons].forEach((element) => {
    element.disabled = true;
  });
};

// Функция, которая перводит поля ввода, кнопки и текстовые поля форм в активное состояние

const setEnabledInput = (form) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const buttons = form.querySelectorAll('button');

  [...inputs, ...selects, ...textareas, ...buttons].forEach((element) => {
    element.disabled = false;
  });
};

// Перевод формы в НЕактивную форму + дезактивация полей

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  setDisabledInput(adForm);
  setDisabledInput(mapForm);
};

// Перевод формы в активную форму + активация полей

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  setEnabledInput(adForm);
  setEnabledInput(mapForm);
};

export { disableForm, enableForm };


