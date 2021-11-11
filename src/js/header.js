import refs from './common/refs.js';

const {
  headerRefs,
  navHomeRefs,
  navLibrRefs,
  btnHomeRefs,
  btnLibrRefs,
  formSearchRefs,
  inputSearchRefs,
  librListRefs,
  logoRefs,
  toggleThemeRefs, 
  bodyRefs
} = refs.refs;

navLibrRefs.addEventListener('click', libOpenClick);
navHomeRefs.addEventListener('click', homeOpenClick);
logoRefs.addEventListener('click', homeOpenClick);

function libOpenClick() {
  headerRefs.classList.add('header__library');
  headerRefs.classList.remove('header__home');
  formSearchRefs.classList.add('is-hidden');
  librListRefs.classList.remove('is-hidden');
  btnLibrRefs.classList.add('current');
  btnHomeRefs.classList.remove('current');
}

function homeOpenClick() {
  headerRefs.classList.remove('header__library');
  headerRefs.classList.add('header__home');
  formSearchRefs.classList.remove('is-hidden');
  librListRefs.classList.add('is-hidden');
  btnHomeRefs.classList.add('current');
  btnLibrRefs.classList.remove('current');
}


const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

themeLocalStorage(inputChange);

toggleThemeRefs.addEventListener('change', inputChange);
function inputChange(evt) {
  const checkedInput = evt.target.checked;
  if (checkedInput) {
    bodyRefs.classList = Theme.DARK;
  } else bodyRefs.classList = Theme.LIGHT;
  localStorage.setItem('theme', bodyRefs.classList);
}
function themeLocalStorage(evt) {
  const saveTheme = localStorage.getItem('theme');
  if (saveTheme === Theme.DARK) {
    toggleThemeRefs.checked = true;
    bodyRefs.classList = saveTheme;
  } else toggleThemeRefs.checked = false;
}
