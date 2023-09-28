const form = document.querySelector('.ad-form');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

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


export { validateForms };
