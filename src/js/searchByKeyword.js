import API from './apiService';
import movieCardTpl from './movie.hbs';
import refs from './common/refs';

const containerRef = document.querySelector('.my-container')
const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault()
    API.fetchMovies(e.currentTarget.elements.query.value)
        .then(results => {
            if (results.length === 0) {
                return "Error"
            } else {
                onRenderMoviesCard(results);
            } 
        })
        .catch(onFetchError)
}

function onRenderMoviesCard(movies) {
    const markup = movieCardTpl(movies.results);
    containerRef.innerHTML = markup;
}

function onFetchError(Error) {
    Error;
}