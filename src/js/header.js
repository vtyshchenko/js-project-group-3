import refs from './common/refs.js';

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
  inputSearchRefs
} = refs.refs;

navLibrRefs.addEventListener('click', libOpenClick);
navHomeRefs.addEventListener('click', homeOpenClick);
logoRefs.addEventListener('click', homeOpenClick);
toggleThemeRefs.addEventListener('change', inputChange);

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
  headerRefs.classList.add('header__library');
  headerRefs.classList.remove('header__home');
  formSearchRefs.classList.add('is-hidden');
  librListRefs.classList.remove('is-hidden');
  btnLibrRefs.classList.add('current');
  btnHomeRefs.classList.remove('current');
  galleryListRefs.innerHTML = '';
  localStorage.setItem('totalPages', 0);
  inputSearchRefs.value = ''  
}

function homeOpenClick() {
  headerRefs.classList.remove('header__library');
  headerRefs.classList.add('header__home');
  formSearchRefs.classList.remove('is-hidden');
  librListRefs.classList.add('is-hidden');
  btnHomeRefs.classList.add('current');
  btnLibrRefs.classList.remove('current');
  inputSearchRefs.value = ''  
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


