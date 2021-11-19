import { init, login, getDb, writeNewData } from '../common/api-firebase';
import { getLanguage } from '../common/api-data';
import refs from '../common/refs';
import { get } from '../common/api-data';

const {
  backdropRefs,
  openModalAuthRefs,
  modalAuthRefs,
  confirmCheckboxRefs,
  authTitleRefs,
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
let userData;
let theme;
let signUpBtnText;
let logInBtnText;
let logOutText;

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
translate();

function styleThemeModal(bck, color, fill) {
  authFormRefs.style.backgroundColor = bck;
  authFormRefs.style.color = color;
  closeModalAuthRefs.style.fill = fill;
}

function translate() {
  let lang = getLanguage();

  if (lang === 'en-US') {
    setText({
      title: 'Please enter user details:',
      email: 'Mail',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      name: 'Name',
      namePlaceholder: 'John Jonson',
      checkboxText: 'Register a new user',
      cancelBtn: 'Close',
      signUpBtn: 'Sign Up',
      logInBtn: 'Log In',
      logOut: 'Log Out',
    });
  } else {
    setText({
      title: 'Будь ласка введіть дані користувача:',
      email: 'Пошта',
      password: 'Пароль',
      passwordPlaceholder: 'Введіть пароль',
      name: "Ім'я",
      namePlaceholder: 'Козаченко Микола',
      checkboxText: 'Зареєструвати нового користувача',
      cancelBtn: 'Закрити',
      signUpBtn: 'Реєстрація',
      logInBtn: 'Увійти',
      logOut: 'Вийти',
    });
  }
}

function setText(data) {
  authTitleRefs.innerHTML = data.title;
  authEmailTextRefs.innerHTML = data.email;
  authPasswordTextRefs.innerHTML = data.password;
  authNameTextRefs.innerHTML = data.name;
  authCheckboxText.innerHTML = data.checkboxText;
  authFormRefs.password.placeholder = data.passwordPlaceholder;
  authFormRefs.name.placeholder = data.namePlaceholder;
  authCancelBtnRefs.innerHTML = data.cancelBtn;
  signUpBtnText = data.signUpBtn;
  logInBtnText = data.logInBtn;
  logOutText = data.logOut;
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

function onOpen(e) {
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
  authSignUpBtnRefs.innerHTML = signUpBtnText;
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

async function onConfirm(e) {
  // e.preventDefault();
  if (!app || !userData) {
    app = await init();
    const userName = authNameRefs.value;
    const userEmail = authEmailRefs.value;
    const userPassword = authPasswordRefs.value;
    const isNewUser = confirmCheckboxRefs.checked;

    userData = await login(app, userName, userPassword, userEmail, isNewUser);
    if (userData) {
      if (userData.operationType === 'signIn') {
        localStorage.setItem('loginUser', userData.user.email);
      }
      openModalAuthRefs.innerHTML = logOutText;
    }
    let db = await getDb(app);

    let body = get();
    let key = userData.user.email.split('@')[0];
    let res = await writeNewData(db, key, body);
  }
}
