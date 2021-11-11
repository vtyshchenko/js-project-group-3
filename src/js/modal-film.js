import modalFilm from '../partials/hbs/modal-film.hbs'
import API from './apiService';
import refs from './common/refs';
const { modalFilmContainerRefs, backdropRefs, closeBtnModalRefs, modalWindowRefs, galleryListRefs, WATCHED, QUEUE, watchedBtnRefs, queueBtnRefs } = refs.refs

import { move, getUser } from './common/api-data';

galleryListRefs.addEventListener('click', onClickMovie)

let idMovie

async function onClickMovie(e) {
  e.preventDefault()
  let temp = e.target
  if (e.target.nodeName !== 'LI') {
    temp = e.target.parentNode;
    while (temp.nodeName !== 'LI' && temp.nodeName !== 'BODY') {
      temp = temp.parentNode
    }
    if (temp.nodeName === 'BODY') {
      return
    }
  }
   idMovie = await API.fetchMovie(temp.id).then(results => {
    if (temp.id == results.id) {
      modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results))
      return results
    }
   })
  
  closeBtnModalRefs.addEventListener('click', onCloseBtnModal)
   window.addEventListener('keydown', onEcsKeyPress)
   watchedBtnRefs.addEventListener('click', onClickWatchedBtn)
   queueBtnRefs.addEventListener('click', onClickQueueBtn)
   backdropRefs.addEventListener('click', onCloseBtnModal)
   
   
   backdropRefs.classList.remove('visually-hidden')
   modalFilmContainerRefs.classList.add('is-open')
   modalWindowRefs.classList.remove('visually-hidden')
   modalWindowRefs.classList.add('is-open')
}

function getName() {
  let name = getUser()
  if (!name) {
    return ''
  }
  return name
}

function onClickWatchedBtn(e){
  let name = getName()
  move(name, QUEUE, WATCHED, idMovie)
}

function onClickQueueBtn(e){
  let name = getName()
  move(name, WATCHED, QUEUE, idMovie)
}
 

function onCloseBtnModal(e) {
  let classes = e.target.classList
  if (classes.contains('backdrop') || classes.contains('close-button__icon') || classes.contains('close__button') || classes.contains('use-close-button')) {
    removeMovieListenier()
}
}

function removeMovieListenier() {
  modalWindowRefs.classList.add('visually-hidden')
  modalWindowRefs.classList.remove('is-open')
  backdropRefs.classList.add('visually-hidden')
  modalFilmContainerRefs.innerHTML = ''
  closeBtnModalRefs.removeEventListener('click', onCloseBtnModal)
  backdropRefs.removeEventListener('click', onCloseBtnModal)
  watchedBtnRefs.removeEventListener('click', onClickWatchedBtn)
  queueBtnRefs.removeEventListener('click', onClickQueueBtn)
  window.removeEventListener('keydown', onEcsKeyPress)

}

function onEcsKeyPress(e) {
  console.log('TEXT');
  if (e.code === 'Escape') {
    removeMovieListenier()
  }
}
