import movieCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import { get, getUser } from './common/api-data';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)

let name = getUser()
let data = get(name)
    
function onWatchedBtnClick() {
    galleryListRefs.innerHTML = movieCardTpl(data.watched);
    const ratingRefs = document.querySelector(".video-average")
    ratingRefs.classList.remove('visually-hidden')
}

function onQueueBtnClick(){    
    galleryListRefs.innerHTML = movieCardTpl(data.queue);
    const ratingRefs = document.querySelector(".video-average")
    ratingRefs.classList.remove('visually-hidden')
}