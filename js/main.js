import './util.js';
import './popup.js';
import { renderAnnouncement } from './popup.js';
import { enableForms } from './form.js';
import { validateForms, setTime } from './validator.js';

renderAnnouncement();
enableForms();
validateForms();
setTime();

