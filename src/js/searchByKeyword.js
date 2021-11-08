import API from './apiService';
import movieCardTpl from './movie.hbs';
import refs from './common/refs';

const containerRef = document.querySelector('.my-container')
const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault()
    if (e.currentTarget.elements.query.value === "") {
        alert("Search result not successful. Enter the correct movie name")
    } 
    API.fetchMovies(e.currentTarget.elements.query.value)
        .then(movieStatus)
        .then(results => {
            onRenderMoviesCard(results);
        })
        .catch(onFetchError)
}

function movieStatus(results) {
  if (results.total_results === 0) {
    alert("Specify your query")
  }
  return Promise.resolve(results)
}

function onRenderMoviesCard(movies) {
    const markup = movieCardTpl(movies.results);
    containerRef.innerHTML = markup;
}

function onFetchError(Error) {
    Error;
}