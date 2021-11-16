import { setLanguage } from './common/api-data'
import refs from './common/refs'
import {getLanguage} from './common/api-data'

const ref = {
  ukrLangSvgRefs: document.querySelector('#ukr'),
  engLangSvgRefs: document.querySelector('#eng'),
  langlabelRefs: document.querySelector('.languages__label'),
    btnLangRefs: document.querySelector('#btn-lang'),
  btnHomeRefs: document.querySelector('#btn-home'),
    btnLibrRefs: document.querySelector('#btn-library'),
    inputSearchRefs: document.querySelector('.header-form__input'),
    btnLogin: document.querySelector('#btn-login'),
  headerWatchedBtnRefs: document.querySelector('#btn-watched'),
    headerQueueBtnRefs: document.querySelector('#btn-queue'),
  watchedBtnRefs: document.querySelector('.btn-watched'),
    queueBtnRefs: document.querySelector('.btn-queue'),
    modalAboutRef: document.querySelector('#about'),
    modalTitleRef: document.querySelector('.movie-flex__title')
}
const{ ukrLangSvgRefs, engLangSvgRefs, btnHomeRefs, btnLibrRefs,inputSearchRefs, btnLogin, headerWatchedBtnRefs,
  headerQueueBtnRefs, watchedBtnRefs,
    queueBtnRefs, iconUSRef, iconUARef, modalAboutRef, modalTitleRef, langlabelRefs, btnLangRefs } = ref
  
console.log(modalAboutRef);
console.log(queueBtnRefs);

ukrLangSvgRefs.addEventListener('click', onChangeLangUA)
engLangSvgRefs.addEventListener('click', onChangeLangUS)

function onChangeLangUA() {
    setLanguage('uk-UA')
    location.reload()
}

function onChangeLangUS() {
    setLanguage('en-US')
    location.reload();
}
getLanguage()

function ukrLangSvgClick() {
  if (localStorage.getItem('language') === 'uk-UA') {
    btnHomeRefs.innerHTML='Додому'
    btnLibrRefs.innerHTML ='Моя бібліотека'
    inputSearchRefs.placeholder = 'Шукати фільми'
    btnLogin.innerHTML = 'Увійти'
    headerWatchedBtnRefs.innerHTML= 'Переглянуте'
    headerQueueBtnRefs.innerHTML = 'У черзі'
    watchedBtnRefs.innerHTML = 'До переглянутих'
      queueBtnRefs.innerHTML = 'Дивитися потім';
      ukrLangSvgRefs.style.border = '1px solid orange'
      modalAboutRef.innerHTML = 'Про фільм'
  }
}

function engLangSvgClick(){
  if (localStorage.getItem('language') === 'en-US') {
      engLangSvgRefs.style.border = '1px solid orange'
  }
}
ukrLangSvgClick()
engLangSvgClick()











//  <ul class="movie-flex__list">
//         <li class="movie-flex__title movie-flex-vote">Vote / Votes</li>
//         <li class="movie-flex__title movie-flex-popularity">Popularity</li>
//         <li class="movie-flex__title movie-flex-title">Original Title</li>
//         <li class="movie-flex__title movie-flex-genre">Genre</li>
//     </ul>

// idMovie = await API.fetchMovie(temp.id).then(results => {
//     if (temp.id == results.id) {
//       modalFilmContainerRefs.insertAdjacentHTML('beforeend', modalFilm(results));
//       const about = document.querySelector('.movie-title__desc')
//       const voteVotes = document.querySelector('.movie-flex-vote')
//       const popularity = document.querySelector('.movie-flex-popularity')
//       const title = document.querySelector('.movie-flex-title')
//       const genreUK = document.querySelector('.movie-flex-genre')
//       if (localStorage.getItem('language') === 'uk-UA') {
//         about.innerHTML = "Про фільм"
//         voteVotes.innerHTML = 'Рейтинг'
//         title.innerHTML = 'Оригінальна назва'
//         genreUK.innerHTML = 'Жанри'
//         popularity.innerHTML= 'Вподобання'
//       }
//       return results;
//     }
//   });


// function onClickWatchedBtn(e) {
//   let name = getName();
//   move(name, QUEUE, WATCHED, idMovie);
//   watchedBtnRefs.textContent = 'watched';
//   queueBtnRefs.textContent = 'add to queue';
//   if (localStorage.getItem('language') === 'uk-UA') {
//     watchedBtnRefs.textContent = 'Переглянуті';
//   queueBtnRefs.textContent = 'Додати в чергу';
//   }
// }

// function onClickQueueBtn(e) {
//   let name = getName();
//   move(name, WATCHED, QUEUE, idMovie);
//   watchedBtnRefs.textContent = 'add to watched';
//   queueBtnRefs.textContent = 'queue';
//   if (localStorage.getItem('language') === 'uk-UA') {
//     watchedBtnRefs.textContent = 'Переглянути';
//   queueBtnRefs.textContent = 'Додані в чергу';
//   }
// }