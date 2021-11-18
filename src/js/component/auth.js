import { init, login } from '../common/api-firebase';
import { getLanguage } from '../common/api-data';
import refs from '../common/refs';
// import { title } from 'process';

const {
  backdropRefs,
  openModalAuthRefs,
  modalAuthRefs,
  confirmCheckboxRefs,
  authNameGroupRefs,
  authNameRefs,
  authNameTextRefs,
  authEmailRefs,
  authEmailTextRefs,
  authPasswordRefs,
  authPasswordTextRefs,
  authCheckboxText,
  authFormRefs,
  authCancelBtnRefs,
  authSignUpBtnRefs,
} = refs.refs;

let app;
let userCredentauls;
let theme;
let signUpBtnText;
let logInBtnText;

let onmouseover = function () {
  if (theme === 'dark-theme') {
    this.style.boxShadow = '4px 4px 4px rgb(5, 5, 5)';
    this.style.border = '1px solid rgb(5, 5, 5)';
  }
};
let onmouseout = function () {
  if (theme === 'dark-theme') {
    this.style.boxShadow = '4px 4px 4px rgb(255, 107, 1)';
  }
};

openModalAuthRefs.addEventListener('click', onOpen);
const closeModalAuthRefs = authFormRefs.querySelector('.close__button');

confirmCheckboxRefs.checked = true;
authNameRefs.innerHTML = '';
authEmailRefs.innerHTML = '';
authPasswordRefs.value = '';

function styleThemeModal(bck, color, fill) {
  authFormRefs.style.backgroundColor = bck;
  authFormRefs.style.color = color;
  closeModalAuthRefs.style.fill = fill;
}

function translate() {
  let lang = getLanguage();
  if (lang === 'en-US') {
    // formTitle = '';
    // mailTitle = -'';
    // passwordTitle = '';
    // nameTitle = '';
    // checkboxText = '';
    console.log('authFormRefs', authFormRefs);
    authFormRefs.password.placeholder = 'Enter password';
    authFormRefs.name.placeholder = 'John Jonson';
    // authFormRefs[5].innerText = 'Sign up';
    // authFormRefs[6].innerText = 'Close';
    authCancelBtnRefs.innerHTML = 'Close';
    signUpBtnText = 'Sign Up';
    logInBtnText = 'Log In';
  } else {
    // authFormRefs.name.placeholder = 'Козаченко Микола';
    // formTitle = '';
    // mailTitle = -'';
    // mailPlaceholder = '';
    // passwordTitle = '';
    // passwordPlaceholder = '';

    // nameTitle = '';
    // namePlaceholder = '';
    // checkboxText = '';
    authCancelBtnRefs.innerHTML = 'Закрити';
    signUpBtnText = 'Зареєструватися';
    logInBtnText = 'Увійти';
  }
}

function removeListeners() {
  window.removeEventListener('keydown', onKeyPress);
  closeModalAuthRefs.removeEventListener('click', onClose);
  confirmCheckboxRefs.removeEventListener('change', onCheckboxChange);
  backdropRefs.removeEventListener('click', onClose);
  classToggle();
}

function classToggle() {
  backdropRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  document.body.classList.toggle('modal-open');
  closeModalAuthRefs.classList.toggle('auth__button-close');
}

function onOpen() {
  theme = localStorage.getItem('theme');
  window.addEventListener('keydown', onKeyPress);
  closeModalAuthRefs.addEventListener('click', onClose);
  confirmCheckboxRefs.addEventListener('change', onCheckboxChange);
  backdropRefs.addEventListener('click', onClose);
  authSignUpBtnRefs.addEventListener('click', onConfirm);
  if (theme === 'dark-theme') {
    styleThemeModal('rgb(5, 5, 5)', 'rgb(255, 255, 255)', 'inherit');
  } else {
    styleThemeModal('#f7f7f7', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)');
  }
  classToggle();

  authCancelBtnRefs.onmouseover = onmouseover;
  authCancelBtnRefs.onmouseout = onmouseout;
  authSignUpBtnRefs.onmouseover = onmouseover;
  authSignUpBtnRefs.onmouseout = onmouseout;
  translate();
}

function onKeyPress(e) {
  if (e.code === 'Escape') {
    removeListeners();
  }
}

function onClose(e) {
  let classes = e.target.classList;
  if (
    classes.contains('backdrop') ||
    classes.contains('auth__button-close') ||
    classes.contains('auth__icon') ||
    classes.contains('auth__use') ||
    classes.contains('button-submit-close') ||
    classes.contains('close__button') ||
    classes.contains('close-button__icon') ||
    classes.contains('use-close-button')
  ) {
    removeListeners();
  }
}

function onCheckboxChange(e) {
  let text = '';
  if (e.target.checked) {
    text = signUpBtnText;
    authNameGroupRefs.classList.remove('visually-hidden');
    authFormRefs.style.height = '374px';
  } else {
    text = logInBtnText;
    authNameGroupRefs.classList.add('visually-hidden');
    authFormRefs.style.height = '307px';
  }
  authSignUpBtnRefs.innerHTML = text;
}

function onConfirm() {
  if (!app || !userCredentauls) {
    app = init();
    let userName = authNameRefs.value;
    let userEmail = authEmailRefs.value;
    let userPassword = authPasswordRefs.value;
    let isNewUser = confirmCheckboxRefs.checked;
    console.log('userName', userName);
    console.log('userEmail', userEmail);
    console.log('userPassword', userPassword);
    console.log('isNewUser', isNewUser);
    userCredentauls = login(app, userName, password, email, newUser);
    if (userCredentauls) {
      openModalAuthRefs.innerHTML = 'Log out';
    }
  }
}
