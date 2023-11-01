const ALERT_SHOW_TIME = 5000;

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

const getAnnouncementRank = ({ offer }) => {

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

export { showAlert, getAnnouncementRank };
