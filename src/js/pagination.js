import refs from './apiService.js';
import buttonsTpl from '../partials/hbs/pagination.hbs';

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const breakPoint = 'trending/';

// function fetchPages() {
//   fetch(`${BASE_URL}${breakPoint}all/day?api_key=${refs.themoviedb.keyV3Auth}`)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result);
//       console.log(result.page);
//       console.log(result.total_pages);
//     });
// }

// fetchPages();

const wrapper = document.querySelector('.pagination-wrapper-js');
const arrowLeft = document.querySelector('.arrow-left-js');
const arrowRight = document.querySelector('.arrow-right-js');
const initialPage = document.querySelector('.pagination__link-js');

const page = 5;
const totalPages = 20;

function markupButton(totalPages, page) {
  wrapper.innerHTML = '';
  let beforePages = page - 1;
  let afterPages = page + 1;

  if (page > 1) {
    //*Зробити активною стрілку вліво
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (page == pageLength) {
      // page = initialPage;
      // //*Додати клас "pagination__link-current"
      // page.classList.add('pagination__link-current');
    }
    wrapper.innerHTML += buttonsTpl(pageLength);
  }

  if (page < totalPages) {
    //*Зробити активною кнопку вправо
  }

  // wrapper.innerHTML = buttonsTpl(page);

  // for (let page = 1; page <= totalPages; page++) {
  //   if (page > 1) {
  //     arrowLeft.disabled = true;
  //   }
  // }
}

markupButton(totalPages, page);
