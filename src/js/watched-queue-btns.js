import watchedQueueTpl from '../partials/hbs/watched-queue-markup.hbs'
import refs from './common/refs';
import { get, getUser } from './common/api-data';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice } from '@pnotify/core';
const { galleryListRefs, headerWatchedBtnRefs, headerQueueBtnRefs } = refs.refs

headerWatchedBtnRefs.addEventListener('click', onWatchedBtnClick)
headerQueueBtnRefs.addEventListener('click', onQueueBtnClick)
   
function getMarkup(name) {
    let nameUser = getUser()
    let data = get(nameUser)
    let dataList = ''
    let totalPages = 0
    if (name === 'watched') {
        dataList = data.watched
        totalPages = Math.floor(data.watched.length / 20) + 1
    } else {
        dataList = data.queue
        totalPages = Math.floor(data.queue.length / 20) + 1 
    }
    localStorage.setItem('totalPages', totalPages);
    let genresList = onSearchGenresList(dataList)
    let year = onSearchYear(genresList)
    if (year) {
        galleryListRefs.innerHTML = watchedQueueTpl(year);
    } else {
        galleryListRefs.innerHTML = ''
        return notice({
            text: 'Oops! You have no movies here.',
            delay: 3000,
        }) 
    }
}

function onWatchedBtnClick() {
    getMarkup('watched')
    localStorage.setItem('pageType', 'watched');
}

function onQueueBtnClick() {
    getMarkup('queue')
    localStorage.setItem('pageType', 'queue');
}

function onSearchGenresList(data) {
    if(!data) {return null}
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
    if (!data) { return null }
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
