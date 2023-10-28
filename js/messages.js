const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccessMessage.cloneNode(true);

const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessage = templateErrorMessage.cloneNode(true);

const closeErrorMessageButton = errorMessage.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydownEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onDocumentClick = (evt) => {
  evt.preventDefault();
  hideMessage();
};

function hideMessage (message) {
  message.classList.add('hidden');
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
}

const showMessage = (message, keydownCallback) => {
  document.body.append(message);

  document.addEventListener('keydown', keydownCallback);
  document.addEventListener('click', keydownCallback);
};

const hideErrorMessage = () => {
  hideMessage(errorMessage);
  closeErrorMessageButton.removeEventListener('click', hideErrorMessage);
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

