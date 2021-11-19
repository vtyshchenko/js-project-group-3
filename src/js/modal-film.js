import modalFilm from '../partials/hbs/modal-film.hbs';
import modalTrailer from '../partials/hbs/modal-trailer.hbs';
import API from './api-service';
import refs from './common/refs';
const {
  modalTrailerContainerRefs,
  modalTrailerWindowRefs,
  modalFilmContainerRefs,
  backdropRefs,
  closeBtnModalRefs,
  modalWindowRefs,
  galleryListRefs,
  WATCHED,
  QUEUE,
  watchedBtnRefs,
  queueBtnRefs,
  modalsWrapperRefs,
} = refs.refs;

import { move, getUser, getLanguage } from './common/api-data';
const lang = getLanguage();

galleryListRefs.addEventListener('click', onClickMovie);

let idMovie;
let theme;

let onmouseover = function () {
  if (theme === 'dark-theme') {
    this.style.boxShadow = '0px 4px 4px rgb(5, 5, 5)';
    this.style.border = '1px solid rgb(5, 5, 5)';
  }
};
let onmouseout = function () {
  if (theme === 'dark-theme') {
    this.style.boxShadow = '0px 4px 4px rgb(255, 107, 1)';
  }
};

function getNode(e) {
  let temp = e.target;
  if (e.target.nodeName !== 'LI') {
    temp = e.target.parentNode;
    while (temp.nodeName !== 'LI' && temp.nodeName !== 'BODY') {
      temp = temp.parentNode;
    }
    if (temp.nodeName === 'BODY') {
      return;
    }
  }
  return temp;
}

function getTrailer(nodeData) {
  API.fetchTrailer(nodeData.id).then(results => {
    const trailer = results.results[0].key;
    if (nodeData.id == results.id) {
      results.trailer = trailer;
      modalTrailerContainerRefs.insertAdjacentHTML('beforeend', modalTrailer(results));
      return results;
    }
  });
  if (theme === 'dark-theme') {
    styleThemeTrailerModal('rgb(5, 5, 5)', 'inherit');
  } else {
    styleThemeTrailerModal('', 'rgb(0, 0, 0)');
  }
}

async function getFilm(nodeData) {
  return await API.fetchMovie(nodeData.id).then(results => {
    if (nodeData.id == results.id) {
      modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results));
      translateModal();
      return results;
    }
  });
}

export async function onClickMovie(e) {
  e.preventDefault();
  let temp = getNode(e);

  theme = localStorage.getItem('theme');
  let isTrailer = Array.from(e.target.classList).includes('card__overlay');

  if (isTrailer) {
    getTrailer(temp);
  } else {
    idMovie = await getFilm(temp);
    onMouseOutOver();
    setThemeSettings();
  }

  addEventListeners();
  classListStyles();

  if (isTrailer) {
    classListStylesIsTrailer();
  } else {
    classListStylesIsFilm();
  }
}

function setThemeSettings() {
  if (theme === 'dark-theme') {
    styleThemeModal(
      'rgb(5, 5, 5)',
      'rgb(255, 255, 255)',
      'rgb(83, 83, 83)',
      'inherit',
      'rgba(255, 107, 0, 0.75)',
    );
  } else {
    styleThemeModal('', '', '', 'rgb(0, 0, 0)', '');
  }
}

function onMouseOutOver() {
  watchedBtnRefs.onmouseover = onmouseover;
  watchedBtnRefs.onmouseout = onmouseout;
  queueBtnRefs.onmouseover = onmouseover;
  queueBtnRefs.onmouseout = onmouseout;
}

function addEventListeners() {
  closeBtnModalRefs.addEventListener('click', onCloseBtnModal);
  window.addEventListener('keydown', onEcsKeyPress);
  watchedBtnRefs.addEventListener('click', onClickWatchedBtn);
  queueBtnRefs.addEventListener('click', onClickQueueBtn);
  backdropRefs.addEventListener('click', onCloseBtnModal);
}

function classListStylesIsFilm() {
  modalWindowRefs.classList.remove('visually-hidden');
  modalWindowRefs.classList.add('is-open');
  closeBtnModalRefs.classList.add('close-film__position');
  modalsWrapperRefs.classList.add('modal-wrapper-film');
}

function classListStylesIsTrailer() {
  modalTrailerWindowRefs.classList.remove('visually-hidden');
  modalTrailerWindowRefs.classList.add('is-open');
  closeBtnModalRefs.classList.add('close-trailer__position');
  modalsWrapperRefs.classList.add('modal-wrapper-trailer');
}

function classListStyles() {
  document.body.classList.toggle('modal-open');
  backdropRefs.classList.remove('visually-hidden');
  modalsWrapperRefs.classList.remove('visually-hidden');
  modalFilmContainerRefs.classList.add('is-open');
}

function styleThemeModal(bck, color, votesbck, fill, containerBc) {
  const votes = document.querySelector('.movie-flex__votes');
  const companyContainerRef = document.querySelector('.company-container');

  modalWindowRefs.style.backgroundColor = bck;
  modalWindowRefs.style.color = color;
  votes.style.backgroundColor = votesbck;
  closeBtnModalRefs.style.fill = fill;
  companyContainerRef.style.backgroundColor = containerBc;
  companyContainerRef.style.borderRadius = '10px';
}

function styleThemeTrailerModal(bck, fill) {
  modalTrailerWindowRefs.style.backgroundColor = bck;
  closeBtnModalRefs.style.fill = fill;
}

function getName() {
  let name = getUser();
  if (!name) {
    return '';
  }
  return name;
}

function onClickWatchedBtn(e) {
  let name = getName();
  move(name, QUEUE, WATCHED, idMovie);
  watchedBtnRefs.textContent = 'watched';
  queueBtnRefs.textContent = 'add to queue';
  if (lang === 'uk-UA') {
    watchedBtnRefs.textContent = 'Переглянуто';
    queueBtnRefs.textContent = 'Додати в чергу';
  }
}

function onClickQueueBtn(e) {
  let name = getName();
  move(name, WATCHED, QUEUE, idMovie);
  watchedBtnRefs.textContent = 'add to watched';
  queueBtnRefs.textContent = 'queue';
  if (lang === 'uk-UA') {
    watchedBtnRefs.textContent = 'Переглянути';
    queueBtnRefs.textContent = 'Додано в чергу';
  }
}

function onCloseBtnModal(e) {
  let classes = e.target.classList;
  if (
    classes.contains('backdrop') ||
    classes.contains('close-button__icon') ||
    classes.contains('close__button') ||
    classes.contains('use-close-button')
  ) {
    removeMovieListenier();
  }
}

function removeMovieListenier() {
  modalTrailerWindowRefs.classList.add('visually-hidden');
  modalTrailerWindowRefs.classList.remove('is-open');
  modalTrailerContainerRefs.innerHTML = '';
  modalWindowRefs.classList.add('visually-hidden');
  modalWindowRefs.classList.remove('is-open');
  modalFilmContainerRefs.innerHTML = '';

  document.body.classList.toggle('modal-open');
  backdropRefs.classList.add('visually-hidden');
  modalsWrapperRefs.classList.add('visually-hidden');
  closeBtnModalRefs.removeEventListener('click', onCloseBtnModal);
  backdropRefs.removeEventListener('click', onCloseBtnModal);
  watchedBtnRefs.removeEventListener('click', onClickWatchedBtn);
  queueBtnRefs.removeEventListener('click', onClickQueueBtn);
  window.removeEventListener('keydown', onEcsKeyPress);
  closeBtnModalRefs.classList.remove('close_position');
  clearBtns();
}

function clearBtns() {
  watchedBtnRefs.textContent = 'add to watched';
  queueBtnRefs.textContent = 'add to queue';
  if (lang === 'uk-UA') {
    queueBtnRefs.textContent = 'Додати в чергу';
    watchedBtnRefs.textContent = 'Переглянути';
  }
}

export default function onEcsKeyPress(e) {
  if (e.code === 'Escape') {
    removeMovieListenier();
  }
}

function translateModal() {
  const about = document.querySelector('.movie-title__desc');
  const voteVotes = document.querySelector('.movie-flex-vote');
  const popularity = document.querySelector('.movie-flex-popularity');
  const title = document.querySelector('.movie-flex-title');
  const genreUK = document.querySelector('.movie-flex-genre');
  if (lang === 'uk-UA') {
    about.innerHTML = 'Про фільм';
    voteVotes.innerHTML = 'Рейтинг';
    title.innerHTML = 'Оригінальна назва';
    genreUK.innerHTML = 'Жанри';
    popularity.innerHTML = 'Вподобання';
  }
}
