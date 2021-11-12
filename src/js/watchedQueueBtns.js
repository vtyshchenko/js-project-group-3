// import movieCardTpl from '../partials/hbs/video-card.hbs';
import watchedQueueTpl from '../partials/hbs/watchedQueue-markup.hbs'
import refs from './common/refs';
import { get, getUser } from './common/api-data';
import { cloneWith } from 'lodash';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)
    
function onWatchedBtnClick() {
    let name = getUser()
    let data = get(name)
    let genresListWatched = onSearchGenresList(data.watched)
    let watchedYear = onSearchYear(genresListWatched)
    console.log(watchedYear);
    galleryListRefs.innerHTML = watchedQueueTpl(watchedYear);
}

function onQueueBtnClick() {
    let name = getUser()
    let data = get(name)
    let genresListQueue = onSearchGenresList(data.queue)
    let queueYear = onSearchYear(genresListQueue)
    console.log(queueYear);
    galleryListRefs.innerHTML = watchedQueueTpl(queueYear);
}

function onSearchGenresList(data) {
    let newData = JSON.parse(JSON.stringify(data))
//   console.log(data);
//   let newData = [...data] 
    newData = newData.map(elem => {
    //   console.log(elem);
   
    let genre = elem.genres.map(item => {
        // console.log(item.name);
        return item.name
    })
        // console.log(genre);
     if (genre.length === 0) {
            genre = ["No genre"]
            // console.log(genre);
        }
    
    if (genre.length >= 3) {
            genre = genre.slice(0, 2)
            genre.push('Other')
            console.log(...genre);
    }
        genre = genre.join(', ')
        // console.log(a.join(', '));
        // return genre.join(', ')
        
        // console.log(elem.genres);
        elem.genres = genre
    return elem
  })
  
  return newData;
}


function onSearchYear(data) {
    let newYear = JSON.parse(JSON.stringify(data))
   newYear = newYear.map(elem => {
    if (elem.release_date) {
      elem.release_date =  elem.release_date.split('-')[0];
    } else {
     elem.release_date = 'No date'
      }
 return elem
  })
return newYear
}
