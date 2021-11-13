import API from './api-service';
import movieCardTpl from '../partials/hbs/video-card.hbs';
import { onSearchYear, onSearchGenresList } from './search-genres-and-year';
import refs from './common/refs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const { galleryListRefs, inputSearchRefs } = refs.refs;

const debounce = require('lodash.debounce');
inputSearchRefs.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  if (!inputSearchRefs.value) {
    return notice({
      text: 'Please enter your search query.',
      delay: 3000,
    });
  }
  API.fetchMovies(inputSearchRefs.value.trim())
    .then(onSearchYear)
    .then(onSearchGenresList)
    .then(movieStatus)
    .then(results => {
      onRenderMoviesCard(results);
      localStorage.setItem('pageType', 'search by keyword');
      localStorage.setItem('totalPages', results.total_pages);
    })
    .catch(onFetchError);
}

function movieStatus(results) {
  if (results.total_results === 0) {
    onFetchError()
  }
  return Promise.resolve(results);
}

function onRenderMoviesCard(movies) {
  const markup = movieCardTpl(movies.results);
  galleryListRefs.innerHTML = markup;
  const ratingRefs = document.querySelectorAll(".video-average")
  for (const el of ratingRefs) {
    el.classList.remove('visually-hidden')
  }
}

function onFetchError() {
  return error({
    text: 'Search result not successful. Enter the correct movie name!',
    delay: 4000,
  });
}
