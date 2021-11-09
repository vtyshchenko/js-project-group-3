import modalFilm from '../partials/hbs/modal-film.hbs'
import API from './apiService';
import refs from './common/refs';
const { modalFilmContainerRefs, backdropRefs, closeBtnModalRefs, modalWindowRefs, galleryListRefs } = refs.refs

galleryListRefs.addEventListener('click', onClickMovie)

function onClickMovie(e) {
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
  API.fetchMovie(temp.id).then(results => {
    if (temp.id == results.id) {
      modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results))
    }
  })
  
  closeBtnModalRefs.addEventListener('click', onCloseBtnModal)
  backdropRefs.addEventListener('click', onCloseBtnModal)
  window.addEventListener('keydown', onEcsKeyPress)
  backdropRefs.classList.remove('visually-hidden')
  modalFilmContainerRefs.classList.add('is-open')
  modalWindowRefs.classList.add('is-open')
}

function onCloseBtnModal() {
  modalWindowRefs.classList.remove('is-open')
  backdropRefs.classList.add('visually-hidden')
  window.removeEventListener('keydown', onEcsKeyPress)
  modalFilmContainerRefs.innerHTML = ''
  closeBtnModalRefs.removeEventListener('click', onCloseBtnModal)
  backdropRefs.removeEventListener('click', onCloseBtnModal)
}

function onEcsKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  onCloseBtnModal()
}
