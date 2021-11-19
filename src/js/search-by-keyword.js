import API from './api-service';
import movieCardTpl from '../partials/hbs/video-card.hbs';
import { getLanguage } from './common/api-data';
import { onSearchYear, onSearchGenresList } from './search-genres-and-year.js';
import refs from './common/refs';

const {
  galleryListRefs,
  inputSearchRefs,
  errorPictureRefs,
  emptySearchRefs,
  emptySearchTextRefs,
  errorTextRefs,
} = refs.refs;

const lang = getLanguage();

export async function onSearch(page) {
  if (!page) {
    page = 1;
  }
  await API.fetchMovies(inputSearchRefs.value.trim(), page)
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
    emptySearchRefs.classList.add('visually-hidden');
    errorPictureRefs.classList.remove('visually-hidden');
    if (lang === 'uk-UA') {
      errorTextRefs.textContent = 'Такого фільму не знайдено. Введіть правильну назву!';
    }
    galleryListRefs.innerHTML = '';
  }
  return Promise.resolve(results);
}

function onRenderMoviesCard(movies) {
  const markup = movieCardTpl(movies.results);
  emptySearchRefs.classList.add('visually-hidden');
  galleryListRefs.innerHTML = markup;
  const ratingRefs = document.querySelectorAll('.video-average');
  for (const el of ratingRefs) {
    el.classList.remove('visually-hidden');
  }
  if (markup) {
    errorPictureRefs.classList.add('visually-hidden');
  }
}

function onFetchError() {
  errorPictureRefs.classList.add('visually-hidden');
  emptySearchRefs.classList.remove('visually-hidden');
  if (lang === 'uk-UA') {
    emptySearchTextRefs.textContent = 'Будь-ласка введіть назву фільму!';
  }
  galleryListRefs.innerHTML = '';
}
