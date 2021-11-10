import movieCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import { get, getUser } from './common/api-data';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)
function onWatchedBtnClick(e) {
    let name = getUser()
    let data = get(name)
    
    const markup = movieCardTpl(data.watched);
    galleryListRefs.innerHTML = markup;
}


function onQueueBtnClick(e){
    let name = getUser()
    let data = get(name)
    
    const markup = movieCardTpl(data.queue);
    galleryListRefs.innerHTML = markup;
}


