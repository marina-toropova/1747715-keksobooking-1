import './util.js';
import './popup.js';
import { disableForms } from './form.js';
import { validateForms, setTime } from './validator.js';
import { loadMap } from './map.js';
import { showSuccessMessage } from './success-message.js';

disableForms();
validateForms('Данные успешно отправлены');
setTime();
loadMap();
validateForms(showSuccessMessage);
