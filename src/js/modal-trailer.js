import API from './api-service';
import modalTrailer from '../partials/hbs/modal-trailer.hbs';
import onEcsKeyPress from './modal-film';
import refs from './common/refs';
const { modalTrailerContainerRefs, modalTrailerWindowRefs, buttonsModalFilmRefs, modalFilmContainerRefs, backdropRefs, closeBtnModalRefs, galleryListRefs, WATCHED, QUEUE, watchedBtnRefs, queueBtnRefs } = refs.refs

galleryListRefs.addEventListener('click', onClickTrailer)

function onClickTrailer(e) {
    console.log(e.target);
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
    console.log(temp.id);
    
 API.fetchTrailer(temp.id).then(results => {
    const trailerId = results.id
     console.log(trailerId);
     const trailer = results.results[0].key
     console.log(trailer);
     if (temp.id == results.id) {
         results.trailer = trailer
         console.log(results);
      modalTrailerContainerRefs.insertAdjacentHTML('beforeend', modalTrailer(results))
      return results
    }
    //   return data
 })
    let theme = localStorage.getItem('theme')
    
    if (theme === "dark-theme") {
        modalTrailerWindowRefs.style.backgroundColor = "rgb(5, 5, 5)";
    }
    
    closeBtnModalRefs.addEventListener('click', onCloseBtnModalTrailer)
    window.addEventListener('keydown', onEcsKeyPress)
    backdropRefs.addEventListener('click', onCloseBtnModalTrailer)
    backdropRefs.classList.remove('visually-hidden')
    modalTrailerWindowRefs.classList.remove('visually-hidden')
    modalTrailerWindowRefs.classList.add('is-open')
}

function onCloseBtnModalTrailer() {
    modalTrailerWindowRefs.classList.add('visually-hidden')
    modalTrailerWindowRefs.classList.remove('is-open')
    backdropRefs.classList.add('visually-hidden')
    closeBtnModalRefs.removeEventListener('click', onCloseBtnModalTrailer)
    backdropRefs.removeEventListener('click', onCloseBtnModalTrailer)
    window.removeEventListener('keydown', onEcsKeyPress)
    modalTrailerContainerRefs.innerHTML = ''
}


