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

const wrapper = document.querySelector('.pagination__wrapper-js');
const arrowLeft = document.querySelector('.arrow-left-js');
const arrowRight = document.querySelector('.arrow-right-js');
const listernerEvent = document.querySelector('.pagination__wrapper-js');

const firstPage = 1;
let page = 1;
const totalPages = 20;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

arrowLeft.addEventListener('click', onClickArrowLeft);
arrowRight.addEventListener('click', onClickArrowRight);
listernerEvent.addEventListener('click', onClickButton);

function onClickArrowLeft() {
  page -= 1;
  onMarkupButton(totalPages, page);
  return page;
}

function onClickArrowRight() {
  page += 1;
  onMarkupButton(totalPages, page);
  return page;
}

function onClickButton(e) {
  let buttonText = e.target.innerText;
  if (buttonText !== MOVE_PAGE_TEXT) {
    page = Number(buttonText);
  } else {
    let button = e.target;
    while (button.nodeName !== 'LI') {
      button = button.parentNode;
    }
    let buttonArr = Array.from(button.classList);
    if (buttonArr.includes('next')) {
      page += 3;
    } else {
      page -= 3;
    }
    if (page < 0) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
  }
  onMarkupButton(totalPages, page);
}

function onHideArrow() {
  this.classList.add('hidden');
}

function onShowArrow() {
  this.classList.remove('hidden');
}

function onMarkupButton(totalPages, page) {
  let beforePages;
  let afterPages;

  if (page > 0 && page < 6) {
    beforePages = firstPage;
  } else {
    beforePages = page - 4;
  }

  if (page < totalPages - 3) {
    afterPages = page + 4;
  } else {
    afterPages = totalPages;
    beforePages = totalPages - countShowSumbols + 1;
  }

  if (page === 1) {
    //*Зробити не активною стрілку вліво
    arrowLeft.classList.add('hidden');
  } else {
    arrowLeft.classList.remove('hidden');
  }
  let buttons = '';
  //* якщо сторінка від 1 до 5 не для мобілки 108-114
  buttons += buttonsTpl({ id: '', name: 1 });
  if (page > 5) {
    buttons += buttonsTpl({ id: 'prev', name: MOVE_PAGE_TEXT });
  } else {
    buttons += buttonsTpl({ id: '', name: 2 });
    afterPages = countShowSumbols;
  }

  for (let pageLength = beforePages + 2; pageLength <= afterPages - 2; pageLength++) {
    buttons += buttonsTpl({ id: '', name: pageLength });
  }
  //* не для мобілки 120-126
  if (totalPages - page > 4) {
    buttons += buttonsTpl({ id: 'next', name: MOVE_PAGE_TEXT });
  } else {
    buttons += buttonsTpl({ id: '', name: totalPages - 1 });
  }

  buttons += buttonsTpl({ id: '', name: totalPages });
  wrapper.innerHTML = buttons;

  const initialPage = document.querySelectorAll('.pagination__link-js');
  for (const button of initialPage) {
    if (button.innerText === String(page)) {
      //*Додати клас "pagination__link-current"
      button.classList.add('pagination__link-current');
      break;
    }
  }

  if (page === totalPages) {
    arrowRight.classList.add('hidden');
  } else {
    arrowRight.classList.remove('hidden');
  }
}

onMarkupButton(totalPages, page);
