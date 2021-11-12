import movieCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import { get, getUser } from './common/api-data';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)
    
function onWatchedBtnClick() {
    let name = getUser()
    let data = get(name)
    galleryListRefs.innerHTML = movieCardTpl(data.watched);
    clearHidden()
}

function onQueueBtnClick() {
    let name = getUser()
    let data = get(name)
    galleryListRefs.innerHTML = movieCardTpl(data.queue);
    clearHidden()
}

function clearHidden() {
    const ratingRefs = document.querySelectorAll(".video-average")
    for (const el of ratingRefs) {
        el.classList.remove('is-hidden')
    }
}