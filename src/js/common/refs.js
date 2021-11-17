const refs = {
  bodyRefs: document.body,

  headerRefs: document.querySelector('header'),
  navHomeRefs: document.querySelector('.js-home'),
  navLibrRefs: document.querySelector('.js-lib'),
  btnHomeRefs: document.querySelector('#btn-home'),
  btnLibrRefs: document.querySelector('#btn-library'),
  btnLogin: document.querySelector('#btn-login'),

  logoRefs: document.querySelector('.logo'),
  toggleThemeRefs: document.querySelector('.theme-switch__toggle'),
  headerWatchedBtnRefs: document.querySelector('#btn-watched'),
  headerQueueBtnRefs: document.querySelector('#btn-queue'),
  ukrLangSvgRefs: document.querySelector('#ukr'),
  engLangSvgRefs: document.querySelector('#eng'),
  langlabelRefs: document.querySelector('.languages__label'),
  btnLangRefs: document.querySelector('#btn-lang'),

  formSearchRefs: document.querySelector('.header-form'),
  inputSearchRefs: document.querySelector('.header-form__input'),
  librListRefs: document.querySelector('.library__list'),
  btnSearchRefs: document.querySelectorAll('.header-form__button'),

  backdropRefs: document.querySelector('.backdrop'),
  modalFilmContainerRefs: document.querySelector('.movie-container-film'),
  closeBtnModalRefs: document.querySelector('[data-action="close-btn-modal"]'),
  modalWindowRefs: document.querySelector('.modal-film'),
  galleryListRefs: document.querySelector('.gallery-film-list'),
  watchedBtnRefs: document.querySelector('.btn-watched'),
  queueBtnRefs: document.querySelector('.btn-queue'),

  openModalBtnRefs: document.querySelector('[data-modal-open]'),
  modalRefs: document.querySelector('[data-modal]'),
  modalTrailerWindowRefs: document.querySelector('.modal-trailer'),
  modalTrailerContainerRefs: document.querySelector('.modal-trailer-container'),
  modalsWrapperRefs: document.querySelector('.modals'),
  openModalAuthRefs: document.querySelector('[data-auth-modal-open]'),
  modalAuthRefs: document.querySelector('[data-auth-modal]'),
  confirmCheckboxRefs: document.querySelector('.auth__confirm-checkbox'),
  authFormRefs: document.querySelector('.auth__form'),

  authNameGroupRefs: document.querySelector('#auth-input-group-name'),
  authNameRefs: document.querySelector('#user-name'),
  authEmailRefs: document.querySelector('#user-email'),
  authPasswordRefs: document.querySelector('#user-password'),

  buttonRegistrationRefs: document.querySelector('#registration'),

  paginationRefs: document.querySelector('.pagination'),

  WATCHED: 'watched',
  QUEUE: 'queue',

  wrapper: document.querySelector('.pagination__wrapper-js'),
  arrowLeft: document.querySelector('.arrow-left-js'),
  arrowRight: document.querySelector('.arrow-right-js'),
  listernerEvent: document.querySelector('.pagination__wrapper-js'),
};

export default { refs };
