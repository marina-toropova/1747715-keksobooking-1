const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccessMessage.cloneNode(true);

const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessage = templateErrorMessage.cloneNode(true);

const closeErrorMessageButton = errorMessage.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';

const hideMessage = (message) => {
  message.classList.add('hidden');
};

const showMessage = (message, hideFunction) => {
  document.body.append(message);

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideFunction();
    }
  });

  window.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideFunction();
  });
};

const hideErrorMessage = () => {
  hideMessage(errorMessage);
};

const hideSuccessMessage = () => {
  hideMessage(successMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, hideSuccessMessage);
};

const showErrorMessage = () => {
  showMessage(errorMessage, hideErrorMessage);
  closeErrorMessageButton.addEventListener('click', hideErrorMessage);
};

export { showSuccessMessage, showErrorMessage };

