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

function hideMessage () {
  if (!successMessage.classList.contains('hidden')) {
    successMessage.classList.add('hidden');
  }
  if (!errorMessage.classList.contains('hidden')) {
    errorMessage.classList.add('hidden');
  }
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
}

const showMessage = (message, keydownCallback) => {
  document.body.append(message);

  document.addEventListener('keydown', keydownCallback);
  document.addEventListener('click', keydownCallback);
};

const onDocumentHideErrorMessage = () => {
  hideMessage();
};

const onDocumentHideSuccessMessage = () => {
  hideMessage();
};

const showSuccessMessage = () => {
  showMessage(successMessage, onDocumentHideSuccessMessage);
};

const showErrorMessage = () => {
  showMessage(errorMessage, onDocumentHideErrorMessage);
  closeErrorMessageButton.addEventListener('click', onDocumentHideErrorMessage);
};

export { showSuccessMessage, showErrorMessage };

