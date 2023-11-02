const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const housingFileChooser = document.querySelector('.ad-form__input');
const housingPhotoPreview = document.querySelector('.ad-form__photo');
const image = document.createElement('img');

const loadImage = (fileInput, preview) => {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    const matchesByFileType = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (preview.matches('IMG') && matchesByFileType) {
      preview.src = URL.createObjectURL(file);
    } else {
      preview.append(image);
      image.classList.add('ad-form-header__preview');
      image.src = URL.createObjectURL(file);
    }
  });
};

const loadAvatar = loadImage(avatarFileChooser, avatarPreview);
const loadHousingPhoto = loadImage(housingFileChooser, housingPhotoPreview);

const clearAvatarImage = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

const clearHousingImage = () => {
  housingPhotoPreview.innerHTML = '';
};

export { loadAvatar, loadHousingPhoto, clearAvatarImage, clearHousingImage };
