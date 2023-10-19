const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccessMessage.cloneNode(true);
/* const body = document.querySelector('body'); */
const isEscapeKey = (evt) => evt.key === 'Escape';

const hideSuccessMessage = () => {
  successMessage.classList.add('hidden');
};

const showSuccessMessage = () => {
  document.body.append(successMessage);

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  });

  window.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideSuccessMessage();
  });
};

export { showSuccessMessage };
