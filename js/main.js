import './util.js';
import './popup.js';
import { disableForm, disableFilter } from './form.js';
import { validateForms, setTime } from './validator.js';
import { loadMap, loadData } from './map.js';
import { showSuccessMessage } from './messages.js';

disableForm();
disableFilter();
validateForms();
setTime();
loadMap();
loadData();
validateForms(showSuccessMessage);


