import API from './api-service';
import movieCardTpl from '../partials/hbs/video-card.hbs';
import { onSearchYear, onSearchGenresList } from './search-genres-and-year.js';
import refs from './common/refs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const { galleryListRefs, inputSearchRefs } = refs.refs;

const debounce = require('lodash.debounce');
inputSearchRefs.addEventListener('input', debounce(onSearch, 500));

const errorPicture = document.querySelector('.error');
const emptySearch = document.querySelector('.empty-search');

function onSearch(page) {
  if (!page) {
    page = 1;
  }
  if (!inputSearchRefs.value) {
    errorPicture.classList.add('visually-hidden');
    emptySearch.classList.remove('visually-hidden');
    // return notice({
    //   text: 'Please enter your search query.',
    //   delay: 2000,
    // });
    // emptySearch.classList.remove('visually-hidden');
    // galleryListRefs.innerHTML = emptySearch;
  }
  API.fetchMovies(inputSearchRefs.value.trim(), page)
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
    onFetchError();
  }
  return Promise.resolve(results);
}

function onRenderMoviesCard(movies) {
  // emptySearch.classList.add('visually-hidden');
  // errorPicture.classList.add('visually-hidden');
  const markup = movieCardTpl(movies.results);
  galleryListRefs.innerHTML = markup;
  const ratingRefs = document.querySelectorAll('.video-average');
  for (const el of ratingRefs) {
    el.classList.remove('visually-hidden');
  }
}

function onFetchError() {
  errorPicture.classList.remove('visually-hidden');
  // galleryListRefs.innerHTML = emptySearch;
  galleryListRefs.innerHTML = '';
  // emptySearch.classList.remove('visually-hidden');
  // return error({
  //   text: 'Search result not successful. Enter the correct movie name!',
  //   delay: 3000,
  // });
}

function clearError() {
  // if (results.total_results === 0) {
  //   emptySearch.classList.add('visually-hidden');
  //   errorPicture.classList.remove('visually-hidden');
  // }
  // if (!inputSearchRefs.value) {
  //   emptySearch.classList.remove('visually-hidden');
  //   errorPicture.classList.add('visually-hidden');
  // }
}
