const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7cb7f2a84f35ebc2678afebafcd2cb5f';

// ========== Пошук по ключовому слову

function fetchMovies(query) {
  const LANG = localStorage.getItem('language')
  return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${LANG}&page=1&include_adult=false`)
      .then(response => response.json())
}

// ========== Фільм по id

function fetchMovie(movie_id) {
  const LANG = localStorage.getItem('language')
    return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=${LANG}`)
        .then(response => response.json())
}

// ========== Популярні фільми

function fetchPopularFilms(page) {
  const LANG = localStorage.getItem('language')
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}&language=${LANG}`).then(response => {
    return response.json()
  })
}

// ========== Список жанрів
 
function fetchGenres() {
  const LANG = localStorage.getItem('language')
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`).then(response => {
    return response.json()
  })
}

const themoviedb = {
  user: 'mamay.ukr',
  password: 'mamay.ukr',
  email: 'mamay.ukr.1977@gmail.com',
  keyV3Auth: '7cb7f2a84f35ebc2678afebafcd2cb5f',
  keyV4Auth:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2I3ZjJhODRmMzVlYmMyNjc4YWZlYmFmY2QyY2I1ZiIsInN1YiI6IjYxODZlMGM1YzVjMWVmMDAyYzI3NWE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgpe2ZFsuuwD752NaRWkXNGvN6Y_7zSj-ucISFoCXyM',
};

// https://api.themoviedb.org/3/movie/550?api_key=7cb7f2a84f35ebc2678afebafcd2cb5f
// keyV4Auth - token

export default { fetchMovies, fetchMovie, fetchPopularFilms, fetchGenres, themoviedb };

