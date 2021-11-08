import modalFilm from '../partials/hbs/modal-film.hbs'
import API from '../js/apiService'

const containerRef = document.querySelector('.modal-film-container')
const containerList = document.querySelector('.my-container')
const modalWindow = document.querySelector('.modal-film')
const backdrop = document.querySelector('.backdrop')
const closeBtnModal = document.querySelector('[data-action="close-btn-modal"]')
const image = document.getElementsByTagName('img')

closeBtnModal.addEventListener('click', onCloseBtnModal)
backdrop.addEventListener('click', onCloseBtnModal)
window.addEventListener('keydown', onEcsKeyPress)
containerList.addEventListener('click', onClickMovie)

function onClickMovie(e) {
  API.fetchMovie(e.target.id).then(results => {
    console.log(e.target.id)
    console.log(results.id)
    if (e.target.id == results.id) {
      containerRef.insertAdjacentHTML('beforeend', modalFilm(results))
    }
  })
    
  if (e.target.nodeName !== 'IMG') {
    return
  }
  backdrop.classList.remove('visually-hidden')
  containerRef.classList.add('is-open')
  modalWindow.classList.add('is-open')
}

function onCloseBtnModal() {
    modalWindow.classList.remove('is-open')
    backdrop.classList.add('visually-hidden')
  window.removeEventListener('keydown', onEcsKeyPress)
  containerRef.innerHTML = ''
}

function onEcsKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  onCloseBtnModal()
}
