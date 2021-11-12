import watchedQueueTpl from '../partials/hbs/watchedQueue-markup.hbs'
import refs from './common/refs';
import { get, getUser } from './common/api-data';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)
   
function getMarkup(name) {
    let nameUser = getUser()
    let data = get(nameUser)
    let dataList = ''
    if (name === 'watched') {
        dataList = data.watched
    } else {
        dataList = data.queue
    }
    let genresList = onSearchGenresList(dataList)
    let year = onSearchYear(genresList)
    galleryListRefs.innerHTML = watchedQueueTpl(year);
}

function onWatchedBtnClick() {
    getMarkup('watched')
}

function onQueueBtnClick() {
    getMarkup('queue')
}

function onSearchGenresList(data) {
    let newData = JSON.parse(JSON.stringify(data))
    newData = newData.map(elem => {
   
    let genre = elem.genres.map(item => item.name)
     if (genre.length === 0) {
            genre = ["No genre"]
        }
    
    if (genre.length >= 3) {
            genre = genre.slice(0, 2)
            genre.push('Other')
    }
        genre = genre.join(', ')
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
