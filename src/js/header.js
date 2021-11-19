import refs from './common/refs.js';
import onWatchedBtnClick from './watched-queue-btns';
import { onMarkupButton } from './pagination.js';
import { onSearchPopularFilms } from './render-popular-film.js';
import { onSearch } from './search-by-keyword.js';

const {
  headerRefs,
  navHomeRefs,
  navLibrRefs,
  btnHomeRefs,
  btnLibrRefs,
  formSearchRefs,
  librListRefs,
  logoRefs,
  galleryListRefs,
  toggleThemeRefs,
  inputSearchRefs,
  wrapperRefs,
  errorPictureRefs,
  emptyWatchedQueueRefs,
  emptySearchRefs,
} = refs.refs;

navLibrRefs.addEventListener('click', libOpenClick);
navHomeRefs.addEventListener('click', homeOpenClick);
logoRefs.addEventListener('click', homeOpenClick);
toggleThemeRefs.addEventListener('change', inputChange);

const debounce = require('lodash.debounce');
inputSearchRefs.addEventListener('input', debounce(onSearchFilm, 500));

async function onSearchFilm() {
  if (!inputSearchRefs.value) {
    emptySearchRefs.classList.remove('visually-hidden');
    errorPictureRefs.classList.add('visually-hidden');
    galleryListRefs.innerHTML = '';
  }
  await onSearch(1);
  onMarkupButton(1);
}

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const { LIGHT, DARK } = Theme;

let savedTheme = localStorage.getItem('theme');
if (!savedTheme) {
  savedTheme = LIGHT;
  localStorage.setItem('theme', savedTheme);
}

document.body.classList.add(savedTheme);
toggleThemeRefs.checked = savedTheme === DARK;

function libOpenClick() {
  errorPictureRefs.classList.add('visually-hidden');
  emptySearchRefs.classList.add('visually-hidden');
  emptyWatchedQueueRefs.classList.add('visually-hidden');
  headerRefs.classList.add('header__library');
  headerRefs.classList.remove('header__home');
  formSearchRefs.classList.add('visually-hidden');
  librListRefs.classList.remove('visually-hidden');
  btnLibrRefs.classList.add('current');
  btnHomeRefs.classList.remove('current');
  galleryListRefs.innerHTML = '';
  localStorage.setItem('totalPages', 0);
  inputSearchRefs.value = '';
  onWatchedBtnClick.onWatchedBtnClick();
  onMarkupButton();
  wrapperRefs.innerHTML = '';
}

async function homeOpenClick() {
  errorPictureRefs.classList.add('visually-hidden');
  emptySearchRefs.classList.add('visually-hidden');
  emptyWatchedQueueRefs.classList.add('visually-hidden');
  headerRefs.classList.remove('header__library');
  headerRefs.classList.add('header__home');
  formSearchRefs.classList.remove('visually-hidden');
  librListRefs.classList.add('visually-hidden');
  btnHomeRefs.classList.add('current');
  btnLibrRefs.classList.remove('current');
  inputSearchRefs.value = '';
  await onSearchPopularFilms();
  wrapperRefs.innerHTML = '';
  onMarkupButton();
}

function inputChange(e) {
  if (e.target.checked === true) {
    localStorage.setItem('theme', DARK);
    changeClasses(LIGHT, DARK);
  } else {
    localStorage.setItem('theme', LIGHT);
    changeClasses(DARK, LIGHT);
  }
}

function changeClasses(removeClass, addClass) {
  document.body.classList.remove(removeClass);
  document.body.classList.add(addClass);
}
