import refs from './common/refs';
const { backdropRefs, openModalAuthRefs, closeModalAuthRefs, modalAuthRefs, btnLogin } = refs.refs;
console.log('auth beg');
openModalAuthRefs.addEventListener('click', onOpen);
console.log('openModalAuthRefs', openModalAuthRefs);

function onOpen() {
  console.log('auth open');
  window.addEventListener('keydown', onKeyPress);
  closeModalAuthRefs.addEventListener('click', onClose);

  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  backdropRefs.classList.remove('visually-hidden');
  backdropRefs.addEventListener('click', onClose);
  document.body.classList.toggle('modal-open');
}

function removeListeners() {
  console.log('auth removeListeners');
  window.removeEventListener('keydown', onKeyPress);
  closeModalAuthRefs.removeEventListener('click', onClose);
  backdropRefs.removeEventListener('click', onClose);

  modalAuthRefs.classList.toggle('visually-hidden');
  modalAuthRefs.classList.toggle('is-open');
  backdropRefs.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');
}
// function toggleModal() {
//   document.body.classList.toggle('modal-open');
//   refs.modal.classList.toggle('visually-hidden');
// }

function onKeyPress(e) {
  if (e.code === 'Escape') {
    removeListeners();
  }
}

function onClose(e) {
  console.log('auth close');
  let classes = e.target.classList;
  if (
    classes.contains('backdrop') ||
    classes.contains('button') ||
    classes.contains('icon') ||
    classes.contains('auth__use') ||
    classes.contains('button-submit')
  ) {
    console.log('auth close if');
    removeListeners();
  }
}
