const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccessMessage.cloneNode(true);

const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessage = templateErrorMessage.cloneNode(true);

const closeErrorMessageButton = errorMessage.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydownEscape = (evt, message) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage(message);
  }
};

const onDocumentClick = (evt, message) => {
  evt.preventDefault();
  hideMessage(message);
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

const onDocumentHideErrorMessage = () => {
  hideMessage(errorMessage);
};

const onDocumentHideSuccessMessage = () => {
  hideMessage(successMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, onDocumentHideSuccessMessage);
};

const showErrorMessage = () => {
  showMessage(errorMessage, onDocumentHideErrorMessage);
  closeErrorMessageButton.addEventListener('click', onDocumentHideErrorMessage);
};

export { showSuccessMessage, showErrorMessage };

