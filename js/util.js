const ALERT_SHOW_TIME = 5000;
const TIME_OUT_DELAY = 500;

const featuresInputs = document.querySelectorAll('[name="features"]');

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

// Функция, которая сортирует массив с преимуществами

const getFeatureRank = ({ offer }) => {

  let rank = 0;

  if (offer.features) {
    offer.features.forEach((feature) => {
      featuresInputs.forEach((featureInput) => {
        if (feature === featureInput.value && featureInput.checked) {
          rank += 1;
        }
      });
    });
  }

  return rank;
};

// Функция устранения дребезга

const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { showAlert, getFeatureRank, debounce };
