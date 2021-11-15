import refs from './common/refs';
import buttonsTpl from '../partials/hbs/pagination.hbs';
import { onSearchPopularFilms } from './render-popular-film.js';

const { wrapper, arrowLeft, arrowRight, listernerEvent } = refs.refs;
let totalPages = 1;
let page = 1;
const firstPage = 1;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

arrowLeft.addEventListener('click', onClickArrowLeft);
arrowRight.addEventListener('click', onClickArrowRight);
listernerEvent.addEventListener('click', onClickButton);

function onGetTotalPages() {
  return localStorage.getItem('totalPages');
}

function onClickArrowLeft() {
  page -= 1;
  console.log('~ page', page);
  onMarkupPages(page);
  return page;
}

function onClickArrowRight() {
  page += 1;
  onMarkupPages(page);
  return page;
}

function onClickButton(e) {
  totalPages = onGetTotalPages();
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
    } else {
      if (page > totalPages) {
        page = totalPages;
      }
    }
  }
  onMarkupPages(page);
}

function onHideArrowLeft(page) {
  page === 1 ? arrowLeft.classList.add('hidden') : arrowLeft.classList.remove('hidden');
}

function onHideArrowRight(page) {
  page === totalPages ? arrowRight.classList.add('hidden') : arrowRight.classList.remove('hidden');
}

//* малюємо сторінки та кнопки в залежності від типу сторінки
function onMarkupPages(page) {
  const pageType = localStorage.getItem('pageType');

  if (!pageType) {
    pageType = 'popular';
  }
  switch (pageType) {
    case 'popular':
      onSearchPopularFilms(page);
      break;
    case 'search by keyword':
      onSearchPopularFilms(page);
      break;
    case 'watched':
      onWatchedBtnClick();
      break;
    case 'queue':
      onQueueBtnClick();
      break;
  }
  onMarkupButton(page);
}

//* малюємо кнопки
export function onMarkupButton(page) {
  let beforePages;
  let afterPages;
  if (!page) {
    page = 1;
  }
  let totalPages = onGetTotalPages();
  if (totalPages === 1) {
  }
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
      button.classList.add('pagination__link-current');
      break;
    }
  }

  onHideArrowRight();
}

// onMarkupButton(1);
