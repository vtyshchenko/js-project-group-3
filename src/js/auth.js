import refs from './common/refs';
const {
  backdropRefs,
  openModalAuthRefs,
  closeModalAuthRefs,
  modalAuthRefs,
  confirmCheckboxRefs,
  buttonRegistrationRefs,
  authNameRefs,
  authEmailRefs,
  authPasswordRefs,
} = refs.refs;
openModalAuthRefs.addEventListener('click', onOpen);

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
  confirmCheckboxRefs.checked = true;
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
  let text = '';
  if (e.target.checked) {
    text = 'Registration';
  } else {
    text = 'Log in';
  }
  buttonRegistrationRefs.innerHTML = text;
}

function onConfirm() {
  console.log('authNameRefs', authNameRefs);
  console.log('authEmailRefs', authEmailRefs);
  console.log('authPasswordRefs', authPasswordRefs);
  console.log('confirmCheckboxRefs', confirmCheckboxRefs);
  let userName = authNameRefs.value;
  let userEmail = authEmailRefs.value;
  let userPassword = authPasswordRefs.value;
  let isNewUser = confirmCheckboxRefs.checked;
  console.log('userName', userName);
  console.log('userEmail', userEmail);
  console.log('userPassword', userPassword);
  console.log('isNewUser', isNewUser);
}
