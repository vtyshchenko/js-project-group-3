const refs = {
  headerRefs: document.querySelector('header'),
  navHomeRefs: document.querySelector('.js-home'),
  navLibrRefs: document.querySelector('.js-lib'),
  btnHomeRefs: document.querySelector('#btn-home'),
  btnLibrRefs: document.querySelector('#btn-library'),
  formSearchRefs: document.querySelector('.header-form'),
  inputSearchRefs: document.querySelector('.header-form__input'),
  librListRefs: document.querySelector('.library__list'),
  btnSearchRefs: document.querySelectorAll('.header-form__button'),
  logoRefs: document.querySelector('.logo'),
  backdropRefs: document.querySelector('.backdrop'),
  modalFilmContainerRefs: document.querySelector('.modal-film-container'),
  closeBtnModalRefs: document.querySelector('[data-action="close-btn-modal"]'),
  modalWindowRefs: document.querySelector('.modal-film'),
  galleryListRefs: document.querySelector('.gallery-film-list'),
  WATCHED:'watched',
  QUEUE:'queue',
};

export default { refs };
