import API from './apiServise';
import videoCardTpl from '../partials/hbs/video-card.hbs'
// import refs from './common/refs';
// const {galleryListRefs} = refs.refs
const galleryListRefs = document.querySelector('.gallery-film-list')


function onSearchPopularFilms() {
      
    let page = 1

    API.fetchPopularFilms(page).then(data => {
        return data.results
    })
    .then(renderPopFilms)
    .catch(error => {
      console.log(error)
    })
}
         
function renderPopFilms(results) {
   const markup = videoCardTpl(results)
    galleryListRefs.innerHTML = markup
}
    
onSearchPopularFilms()