const form = document.querySelector('.ad-form');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const typeOfHousingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// Валидация полей количества комнат и количества мест

pristine.addValidator(roomNumberSelect, () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  if (rooms === '1' && capacity !== '1') {
    return false;
  } else if (rooms === '2' && capacity !== '1' && capacity !== '2') {
    return false;
  } else if (rooms === '3' && capacity === 'не для гостей') {
    return false;
  } else if (rooms === '100' && capacity !== 'не для гостей') {
    return false;
  } else {
    return true;
  }

}, () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  if (rooms === '1' && capacity !== '1') {
    return '1 комната только для одного гостя';
  } else if (rooms === '2' && capacity !== '1' && capacity !== '2') {
    return '2 комнаты подойдут для двух или одного гостя';
  } else if (rooms === '3' && capacity === 'не для гостей') {
    return 'Выберите количество гостей';
  } else if (rooms === '100' && capacity !== 'не для гостей') {
    return '100 комнат не для гостей';
  } else {
    return 'Выберите количество гостей';
  }
});

roomNumberSelect.addEventListener('change', () => {
  pristine.validate();
});

capacitySelect.addEventListener('change', () => {
  pristine.validate();
});

// Валидация поля типа жилья и цены

pristine.addValidator(typeOfHousingSelect, () => {
  const typeOfHousing = typeOfHousingSelect.value;

  if (typeOfHousing === 'bungalow') {
    priceInput.min = '0';
    priceInput.placeholder = '0';
  } else if (typeOfHousing === 'flat') {
    priceInput.min = '1000';
    priceInput.placeholder = '1000';
  } else if (typeOfHousing === 'hotel') {
    priceInput.min = '3000';
    priceInput.placeholder = '3000';
  } else if (typeOfHousing === 'house') {
    priceInput.min = '5000';
    priceInput.placeholder = '5000';
  } else if (typeOfHousing === 'palace') {
    priceInput.min = '10000';
    priceInput.placeholder = '10000';
  }

}, () => {

  if (priceInput.value < priceInput.min) {
    priceInput.dataset.pristineMessage = `Установите цену не ниже ${priceInput.min}`;
  }
});

typeOfHousingSelect.addEventListener('change', () => {
  pristine.validate();
});

priceInput.addEventListener('change', () => {
  pristine.validate();
});

// Функция, которая синхронизирует время заезда и выезда

const setTime = () => {
  const times = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  };
  const timeIn = timeInSelect.value;
  timeOutSelect.value = times[timeIn];
};

timeInSelect.addEventListener('change', setTime);
timeOutSelect.addEventListener('change', setTime);

const validateForms = () => {

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (isValid) {
      console.log('Можно отправлять');
    } else {
      evt.preventDefault();
    }
  });
};


export { validateForms, setTime };
