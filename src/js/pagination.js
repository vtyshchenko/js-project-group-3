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

const firstPage = 1;
const page = 14;
const totalPages = 20;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

function markupButton(totalPages, page) {
  let beforePages;
  let afterPages;
  if (page > 0 && page < 6) {
    beforePages = firstPage;
  } else {
    beforePages = page - 4;
  }

  if (page < 17) {
    afterPages = page + 4;
  } else {
    afterPages = totalPages;
    beforePages = countShowSumbols + 3;
  }

  if (page === 1) {
    //*Зробити активною стрілку вліво
    arrowLeft.classList.add('hidden');
  }
  let buttons = buttonsTpl(1);
  if (page > 5) {
    buttons += buttonsTpl(MOVE_PAGE_TEXT);
  } else {
    buttons += buttonsTpl(2);
    afterPages = countShowSumbols;
  }

  console.log('beforePages:', beforePages);
  console.log('afterPages:', afterPages);
  for (let pageLength = beforePages + 2; pageLength <= afterPages - 2; pageLength++) {
    buttons += buttonsTpl(pageLength);
  }
  if (totalPages - page > 4) {
    buttons += buttonsTpl(MOVE_PAGE_TEXT);
  } else {
    buttons += buttonsTpl(totalPages - 1);
  }
  buttons += buttonsTpl(totalPages);
  wrapper.innerHTML = buttons;

  const initialPage = document.querySelectorAll('.pagination__link-js');
  console.log('🚀 ~ file: pagination.js ~ line 70 ~ markupButton ~ initialPage', initialPage);
  for (const button of initialPage) {
    if (button.innerText === String(page)) {
      //*Додати клас "pagination__link-current"
      button.classList.add('pagination__link-current');
      break;
    }
  }

  if (page === totalPages) {
    //*Зробити активною кнопку вправо
    arrowRight.classList.add('hidden');
  }

  // wrapper.innerHTML = buttonsTpl(page);

  // for (let page = 1; page <= totalPages; page++) {
  //   if (page > 1) {
  //     arrowLeft.disabled = true;
  //   }
  // }
}

markupButton(totalPages, page);
