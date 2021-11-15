import modalFilm from '../partials/hbs/modal-film.hbs';
import modalTrailer from '../partials/hbs/modal-trailer.hbs';
import API from './api-service';
import refs from './common/refs';
const {
  modalTrailerContainerRefs,
  modalTrailerWindowRefs,
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

  let theme = localStorage.getItem('theme');
  let isTrailer = Array.from(e.target.classList).includes('card__overlay');

  if (isTrailer) {
    API.fetchTrailer(temp.id).then(results => {
      const trailerId = results.id;
      const trailer = results.results[0].key;
      if (temp.id == results.id) {
        results.trailer = trailer;
        modalTrailerContainerRefs.insertAdjacentHTML('beforeend', modalTrailer(results));
        return results;
      }
    });
    if (theme === 'dark-theme') {
      modalTrailerWindowRefs.style.backgroundColor = 'rgb(5, 5, 5)';
    }
  } else {
    idMovie = await API.fetchMovie(temp.id).then(results => {
      if (temp.id == results.id) {
        modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results));
        return results;
      }
    });

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

  closeBtnModalRefs.addEventListener('click', onCloseBtnModal);
  window.addEventListener('keydown', onEcsKeyPress);
  watchedBtnRefs.addEventListener('click', onClickWatchedBtn);
  queueBtnRefs.addEventListener('click', onClickQueueBtn);
  backdropRefs.addEventListener('click', onCloseBtnModal);

  document.body.classList.toggle('modal-open');
  backdropRefs.classList.remove('visually-hidden');
  modalFilmContainerRefs.classList.add('is-open');

  if (isTrailer) {
    modalTrailerWindowRefs.classList.remove('visually-hidden');
    modalTrailerWindowRefs.classList.add('is-open');
    closeBtnModalRefs.classList.add('close_position');
  } else {
    modalWindowRefs.classList.remove('visually-hidden');
    modalWindowRefs.classList.add('is-open');
  }
}

function styleThemeModal(bck, color, votesbck, fill, containerBc) {
  const votes = document.querySelector('.movie-flex__votes');
  const companyContainerRef = document.querySelector('.company-container');

  modalWindowRefs.style.backgroundColor = bck;
  modalWindowRefs.style.color = color;
  votes.style.backgroundColor = votesbck;
  closeBtnModalRefs.style.fill = fill;
  companyContainerRef.style.backgroundColor = containerBc;
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
}

function onClickQueueBtn(e) {
  let name = getName();
  move(name, WATCHED, QUEUE, idMovie);
  watchedBtnRefs.textContent = 'add to watched';
  queueBtnRefs.textContent = 'queue';
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

  closeBtnModalRefs.removeEventListener('click', onCloseBtnModal);
  backdropRefs.removeEventListener('click', onCloseBtnModal);
  watchedBtnRefs.removeEventListener('click', onClickWatchedBtn);
  queueBtnRefs.removeEventListener('click', onClickQueueBtn);
  window.removeEventListener('keydown', onEcsKeyPress);
  closeBtnModalRefs.classList.remove('close_position');
}

export default function onEcsKeyPress(e) {
  if (e.code === 'Escape') {
    removeMovieListenier();
  }
}
