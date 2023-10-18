import './util.js';
import './popup.js';
import { disableForms } from './form.js';
import { validateForms, setTime } from './validator.js';
import { loadMap } from './map.js';
import { createLoader } from './get-data.js';

const loadAnimals = createLoader(console.log, console.error);

loadAnimals();

disableForms();
validateForms();
setTime();
loadMap();


