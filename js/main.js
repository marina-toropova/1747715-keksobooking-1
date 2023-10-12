import './util.js';
import './popup.js';
import { disableForms } from './form.js';
import { validateForms, setTime } from './validator.js';
import { loadMap } from './map.js';

disableForms();
validateForms();
setTime();
loadMap();


