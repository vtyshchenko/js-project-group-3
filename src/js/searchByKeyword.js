import API from './apiService';
import movieCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const { formSearchRefs, galleryListRefs } = refs.refs

formSearchRefs.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault()
    if (!e.currentTarget.elements.query.value) {
        return notice({
            text: 'Please enter your search query.',
            delay: 3000,
        });
    } 
    API.fetchMovies(e.currentTarget.elements.query.value)
        .then(movieStatus)
        .then(results => {
            onRenderMoviesCard(results);
            localStorage.setItem("pageType", "search by keyword");
            localStorage.setItem("totalPages", results.total_pages);   
        })
        .catch(onFetchError)
}

function movieStatus(results) {
  if (results.total_results === 0) {
    onFetchError()
  }
  return Promise.resolve(results)
}

function onRenderMoviesCard(movies) {
    const markup = movieCardTpl(movies.results);
    galleryListRefs.innerHTML = markup;
}

function onFetchError() {
    return error({
        text: 'Search result not successful. Enter the correct movie name!',
        delay: 4000,
    });
}

