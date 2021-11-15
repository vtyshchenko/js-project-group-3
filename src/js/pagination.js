import refs from './common/refs';
import buttonsTpl from '../partials/hbs/pagination.hbs';
import onSearchPopularFilms from './render-popular-film.js';

const { wrapper, arrowLeft, arrowRight, listernerEvent } = refs.refs;
let totalPages = 1;

arrowLeft.addEventListener('click', onClickArrowLeft);
arrowRight.addEventListener('click', onClickArrowRight);
listernerEvent.addEventListener('click', onClickButton);

function onGetTotalPages() {
  return localStorage.getItem('totalPages');
}
// console.log('~ onGetTotalPages()', onGetTotalPages());

function onClickArrowLeft() {
  page -= 1;
  // onMarkupButton(page);
  // onSearchPopularFilm(e, page);
  return page;
}

function onClickArrowRight() {
  page += 1;
  // onMarkupButton(page);
  // onSearchPopularFilms(e, page);
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

//   onSearchPopularFilms(e, page);
//   onMarkupButton(totalPages, page);
// }

function onHideArrowLeft(page) {
  page === 1 ? arrowLeft.classList.add('hidden') : arrowLeft.classList.remove('hidden');
}

function onHideArrowRight(page) {
  page === totalPages ? arrowRight.classList.add('hidden') : arrowRight.classList.remove('hidden');
}
function onMarkupButton(page) {
  markupButton(page);
}
export function markupButton(page) {
  console.log(page);
  const firstPage = 1;
  const countShowSumbols = 9;
  const MOVE_PAGE_TEXT = '...';
  // let page;
  let beforePages;
  let afterPages;
  if (!page) {
    page = 1;
  }
  // console.log('~ onGetTotalPages()', totalPages);
  let totalPages = onGetTotalPages();
  console.log('~ onGetTotalPages()', totalPages);
  // let totalPages = 20;

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

  onHideArrowLeft(page);

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

  onHideArrowRight();
}

// onMarkupButton(1);
