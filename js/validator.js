const form = document.querySelector('.ad-form');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const typeOfHousingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const roomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['не для гостей']
};

const typeOfHousingOptions = {
  'bungalow': {
    minPrice: 0,
    placeholder: '0'
  },
  'flat': {
    minPrice: 1000,
    placeholder: '1000'
  },
  'hotel': {
    minPrice: 3000,
    placeholder: '3000'
  },
  'house': {
    minPrice: 5000,
    placeholder: '5000'
  },
  'palace': {
    minPrice: 10000,
    placeholder: '10000'
  }
};

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

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// Функция, которая синхронизирует поля количества гостей и комнат

const validateRoomAndCapacity = () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  return roomOptions[rooms].includes(capacity);
};

// Функция, которая синхронизирует поля цены и типов жилья

const validateTypeAndPrice = () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  const placeholder = typeOfHousingOptions[typeOfHousing].placeholder;
  priceInput.min = minPrice;
  priceInput.placeholder = placeholder;
  return priceInput.value >= minPrice;
};

// Валидация полей количества комнат и количества мест

pristine.addValidator(roomNumberSelect, validateRoomAndCapacity, () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;
  let message = '';
  if (rooms === '1') {
    message = `${rooms} комната не предназначается для ${capacity} гостей`;
  } else if (rooms === '2' || rooms === '3') {
    message = `${rooms} комнаты не предназначаются для ${capacity} гостей`;
  } else {
    message = `${rooms} комнат не для гостей`;
  }
  return message;
});

// Валидация поля типа жилья и цены

pristine.addValidator(typeOfHousingSelect, validateTypeAndPrice, () => {
  const typeOfHousing = typeOfHousingSelect.value;
  const minPrice = typeOfHousingOptions[typeOfHousing].minPrice;
  priceInput.min = minPrice;
  return `Установите цену не ниже ${typeOfHousingOptions[typeOfHousing].minPrice}`;
}
);

roomNumberSelect.addEventListener('change', () => {
  pristine.validate();
});
capacitySelect.addEventListener('change', () => {
  pristine.validate();
});
typeOfHousingSelect.addEventListener('change', () => {
  pristine.validate();
});
priceInput.addEventListener('change', () => {
  pristine.validate();
});
timeInSelect.addEventListener('change', setTime);
timeOutSelect.addEventListener('change', setTime);

const validateForms = () => {

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};


export { validateForms, setTime };