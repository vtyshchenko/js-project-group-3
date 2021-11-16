import { init, login } from './common/api-firebase';
import refs from './common/refs';
const {
  backdropRefs,
  openModalAuthRefs,
  closeModalAuthRefs,
  modalAuthRefs,
  confirmCheckboxRefs,
  buttonRegistrationRefs,
  authNameGroupRefs,
  authNameRefs,
  authEmailRefs,
  authPasswordRefs,
  authFormRefs,
} = refs.refs;

openModalAuthRefs.addEventListener('click', onOpen);
confirmCheckboxRefs.checked = true;
authNameRefs.innerHTML = '';
authEmailRefs.innerHTML = '';
authPasswordRefs.innerHTML = '';
let app;
let userCredentauls;

function onOpen() {
  window.addEventListener('keydown', onKeyPress);
  closeModalAuthRefs.addEventListener('click', onClose);
  confirmCheckboxRefs.addEventListener('change', onCheckboxChange);
  backdropRefs.addEventListener('click', onClose);
  buttonRegistrationRefs.addEventListener('click', onConfirm);

  backdropRefs.classList.remove('visually-hidden');
  modalAuthRefs.classList.remove('visually-hidden');
  modalAuthRefs.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function removeListeners() {
  window.removeEventListener('keydown', onKeyPress);
  closeModalAuthRefs.removeEventListener('click', onClose);
  confirmCheckboxRefs.removeEventListener('change', onCheckboxChange);
  backdropRefs.removeEventListener('click', onClose);

  backdropRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  document.body.classList.toggle('modal-open');
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
    classes.contains('button-submit-close')
  ) {
    removeListeners();
  }
}

function onCheckboxChange(e) {
  console.log(e);
  let text = '';
  if (e.target.checked) {
    text = 'Registration';
    authNameGroupRefs.classList.remove('visually-hidden');
    authFormRefs.style.height = '360px';
  } else {
    text = 'Log in';
    authNameGroupRefs.classList.add('visually-hidden');
    authFormRefs.style.height = '300px';
  }
  buttonRegistrationRefs.innerHTML = text;
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
