const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7cb7f2a84f35ebc2678afebafcd2cb5f';
// let url = `https://api.themoviedb.org/3/search/movie?api_key=7cb7f2a84f35ebc2678afebafcd2cb5f&language=en-US&page=1&include_adult=false`
// console.log(url);
let page = 1
function fetchMovies(query, movie_id) {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`)
    .then(response =>
    response.json()
  )
}

export default { fetchMovies };