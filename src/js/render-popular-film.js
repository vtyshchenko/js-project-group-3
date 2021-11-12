import API from './apiService';
import videoCardTpl from '../partials/hbs/video-card.hbs';
import refs from './common/refs';
import { onSearchYear, onSearchGenresList } from './search-genres-and-year.js';

const { galleryListRefs, btnHomeRefs, logoRefs } = refs.refs;

btnHomeRefs.addEventListener('click', onSearchPopularFilms);
logoRefs.addEventListener('click', onSearchPopularFilms)

export default function onSearchPopularFilms(e, page) {
  if (!page) {
    page = 1;
  }

  API.fetchGenres()
    .then(data => {
      return data.genres;
    })
    .then(onSaveGenres);

  API.fetchPopularFilms(page)
    .then(onSearchGenresList)
    .then(onSearchYear)
    .then(data => {
      localStorage.setItem('totalPages', data.total_pages);
      localStorage.setItem('pageType', 'popular');

      return data.results;
    })
    .then(renderPopFilms)
    .catch(error => {
      console.log(error);
    });
}

function renderPopFilms(results) {
  const markup = videoCardTpl(results);
  galleryListRefs.innerHTML = markup;
}

onSearchPopularFilms();

function onSaveGenres(genres) {
  localStorage.setItem('genres', JSON.stringify(genres));
}
