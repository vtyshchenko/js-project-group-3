import modalFilm from '../partials/hbs/modal-film.hbs';
import API from './api-service';
import refs from './common/refs';
const {
  buttonsModalFilmRefs,
  modalFilmContainerRefs,
  backdropRefs,
  closeBtnModalRefs,
  modalWindowRefs,
  galleryListRefs,
  WATCHED,
  QUEUE,
  watchedBtnRefs,
  queueBtnRefs,
} = refs.refs;

import { move, getUser } from './common/api-data';

galleryListRefs.addEventListener('click', onClickMovie);

let idMovie;

async function onClickMovie(e) {
  e.preventDefault();
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
  idMovie = await API.fetchMovie(temp.id).then(results => {
    if (temp.id == results.id) {
      console.log(results);
      modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results));
      return results;
    }
  });

  const votes = document.querySelector('.movie-flex__votes');
  let theme = localStorage.getItem('theme');

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

  watchedBtnRefs.onmouseover = onmouseover;
  watchedBtnRefs.onmouseout = onmouseout;
  queueBtnRefs.onmouseover = onmouseover;
  queueBtnRefs.onmouseout = onmouseout;
  if (theme === 'dark-theme') {
    modalWindowRefs.style.backgroundColor = 'rgb(5, 5, 5)';
    modalWindowRefs.style.color = 'rgb(255, 255, 255)';
    votes.style.backgroundColor = 'rgb(83, 83, 83)';
    closeBtnModalRefs.style.fill = 'inherit';
  } else {
    closeBtnModalRefs.style.fill = 'rgb(0, 0, 0)';
    modalWindowRefs.style.backgroundColor = '';
    modalWindowRefs.style.color = '';
    votes.style.backgroundColor = '';
  }

  closeBtnModalRefs.addEventListener('click', onCloseBtnModal);
  window.addEventListener('keydown', onEcsKeyPress);
  watchedBtnRefs.addEventListener('click', onClickWatchedBtn);
  queueBtnRefs.addEventListener('click', onClickQueueBtn);
  backdropRefs.addEventListener('click', onCloseBtnModal);

  document.body.classList.toggle('modal-open');
  backdropRefs.classList.remove('visually-hidden');
  modalFilmContainerRefs.classList.add('is-open');
  modalWindowRefs.classList.remove('visually-hidden');
  modalWindowRefs.classList.add('is-open');
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
}

function onClickQueueBtn(e) {
  let name = getName();
  move(name, WATCHED, QUEUE, idMovie);
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
  document.body.classList.toggle('modal-open');
  modalWindowRefs.classList.add('visually-hidden');
  modalWindowRefs.classList.remove('is-open');
  backdropRefs.classList.add('visually-hidden');
  modalFilmContainerRefs.innerHTML = '';
  closeBtnModalRefs.removeEventListener('click', onCloseBtnModal);
  backdropRefs.removeEventListener('click', onCloseBtnModal);
  watchedBtnRefs.removeEventListener('click', onClickWatchedBtn);
  queueBtnRefs.removeEventListener('click', onClickQueueBtn);
  window.removeEventListener('keydown', onEcsKeyPress);
}

function onEcsKeyPress(e) {
  if (e.code === 'Escape') {
    removeMovieListenier();
  }
}
