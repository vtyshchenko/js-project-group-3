import API from './apiService';
import movieCardTpl from './movie.hbs';

const inputRef = document.querySelector('.search-input');
// console.log(inputRef);
const containerRef = document.querySelector('.my-container')
inputRef.addEventListener('input', onSearch);
// console.log(5);
function onSearch(e) {
    // searchQuery.value = e.currentTarget.elements.query.value     //inputRef.value.trim();
    // console.log(searchQuery.value);
    e.preventDefault()
    console.log(e.target.value);
    API.fetchMovies(e.target.value.trim())
        .then(results => {
            // if (results.status === 404) {
            //     return "Search result not successful. Enter the correct movie name!"
            // } else {
                onRenderMoviesCard(results);
            // } 
        })
        .catch(onFetchError)
}

function onRenderMoviesCard(results) {
    console.log(results.results);
    const markup = movieCardTpl(results.results);
    console.log(markup);
    containerRef.innerHTML = markup;
}

function onFetchError(Error) {
    Error;
}