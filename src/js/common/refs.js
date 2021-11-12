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
  modalFilmContainerRefs: document.querySelector('.movie-container-film'),
  closeBtnModalRefs: document.querySelector('[data-action="close-btn-modal"]'),
  modalWindowRefs: document.querySelector('.modal-film'),
  galleryListRefs: document.querySelector('.gallery-film-list'),
  watchedBtnRefs: document.querySelector('.btn-watched'),
  queueBtnRefs: document.querySelector('.btn-queue'),
  WATCHED:'watched',
  QUEUE:'queue',
  toggleThemeRefs: document.querySelector('.theme-switch__toggle'),
  bodyRefs: document.querySelector('body'),
  headerWatchedBtnRefs: document.querySelector('#btn-watched'),
  headerQueueBtnRefs: document.querySelector('#btn-queue'),
    openModalBtnRefs: document.querySelector('[data-modal-open]'),
    closeModalBtnRefs: document.querySelector('[data-modal-close]'),
    modalRefs: document.querySelector('[data-modal]'),


};

export default { refs };
