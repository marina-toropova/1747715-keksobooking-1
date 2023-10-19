import './util.js';
import './popup.js';
import { disableForm, disableFilter } from './form.js';
import { validateForms, setTime } from './validator.js';
import { loadMap, loadData } from './map.js';
import { showSuccessMessage } from './success-message.js';

disableForm();
disableFilter();
validateForms('Данные успешно отправлены');
setTime();
loadMap();
loadData();
validateForms(showSuccessMessage);
