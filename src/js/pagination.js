import refs from './common/refs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const breakPoint = 'trending/';

function fetchPages() {
  fetch(`${BASE_URL}${breakPoint}all/day?api_key=${refs.themoviedb.keyV3Auth}`)
    .then(response => response.json())
    .then(console.log);
}

fetchPages();
