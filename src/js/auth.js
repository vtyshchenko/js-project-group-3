import refs from './common/refs';
const {
  backdropRefs,
  openModalAuthRefs,
  closeModalAuthRefs,
  modalAuthRefs,
  confirmCheckboxRefs,
  buttonRegistrationRefs,
} = refs.refs;
openModalAuthRefs.addEventListener('click', onOpen);

function onOpen() {
  window.addEventListener('keydown', onKeyPress);
  closeModalAuthRefs.addEventListener('click', onClose);
  confirmCheckboxRefs.addEventListener('change', onCheckboxChange);

  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  backdropRefs.classList.remove('visually-hidden');
  backdropRefs.addEventListener('click', onClose);
  document.body.classList.toggle('modal-open');
}

function removeListeners() {
  window.removeEventListener('keydown', onKeyPress);
  closeModalAuthRefs.removeEventListener('click', onClose);
  backdropRefs.removeEventListener('click', onClose);

  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  backdropRefs.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');
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
