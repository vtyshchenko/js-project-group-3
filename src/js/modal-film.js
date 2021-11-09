import modalFilm from '../partials/hbs/modal-film.hbs'
import API from '../js/apiService'
import refs from './common/refs';
const { modalFilmContainerRef, backdropRefs, closeBtnModalRefs, modalWindowRefs } = refs.refs

// const containerRef = document.querySelector('.modal-film-container')
const containerList = document.querySelector('.my-container')
// const modalWindow = document.querySelector('.modal-film')
// const backdrop = document.querySelector('.backdrop')
// const closeBtnModal = document.querySelector('[data-action="close-btn-modal"]')

closeBtnModalRefs.addEventListener('click', onCloseBtnModal)
backdropRefs.addEventListener('click', onCloseBtnModal)
window.addEventListener('keydown', onEcsKeyPress)
containerList.addEventListener('click', onClickMovie)

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
      modalFilmContainerRef.insertAdjacentHTML('beforeend', modalFilm(results))
    }
  })
    
  backdropRefs.classList.remove('visually-hidden')
  modalFilmContainerRef.classList.add('is-open')
  modalWindowRefs.classList.add('is-open')
}

function onCloseBtnModal() {
    modalWindowRefs.classList.remove('is-open')
  backdropRefs.classList.add('visually-hidden')
  window.removeEventListener('keydown', onEcsKeyPress)
  modalFilmContainerRef.innerHTML = ''
}

function onEcsKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  onCloseBtnModal()
}
