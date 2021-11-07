import modalFilm from '../partials/hbs/modal-film.hbs'
// console.log(modalFilm);

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7cb7f2a84f35ebc2678afebafcd2cb5f';
// https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=<<api_key>>
function fetchMovie(movie_id) {
    return fetch(`${BASE_URL}/movie/${movie_id}/keywords?api_key=${API_KEY}`)
    .then(response => console.log(response.json()))
}

export default { fetchMovie };

const containerRef = document.querySelector('.modal-film-container')
const modalWindow = document.querySelector('.modal-film')
const backdrop = document.querySelector('.backdrop')
const closeBtnModal = document.querySelector('[data-action="close-btn-modal"]')

closeBtnModal.addEventListener('click', onCloseBtnModal)
backdrop.addEventListener('click', onCloseBtnModal)
window.addEventListener('keydown', onEcsKeyPress)

function onCloseBtnModal() {
    modalWindow.classList.remove('is-open')
    backdrop.classList.add('visually-hidden')
  window.removeEventListener('keydown', onEcsKeyPress)
}

function onEcsKeyPress(e) {
    console.log(e.code);
  if (e.code !== 'Escape') {
    return
  }
  onCloseBtnModal()
}
