import './util.js';
import { renderAnnouncements } from './popup.js';
import {SIMILAR_ANNOUNCEMENTS_COUNT, createAnnouncement} from './data.js';

const getSimilarAnnouncements = Array.from({length: SIMILAR_ANNOUNCEMENTS_COUNT}, createAnnouncement);

renderAnnouncements(getSimilarAnnouncements);
