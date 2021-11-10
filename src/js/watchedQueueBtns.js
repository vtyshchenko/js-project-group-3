import movieCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import { get, getUser, data, getData, setKey } from './common/api-data';
// import { onClickMovie } from './modal-film';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs, WATCHED, QUEUE } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)

function onWatchedBtnClick(e) {
    let name = getUser()
    let data = get(name)
    
    console.log(data.watched);
}

// function onQueueBtnClick(e){
//   let name = getUser()
//     get(name, QUEUE, idMovie.id)
// }


