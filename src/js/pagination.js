import refs from './common/refs';
import buttonsTpl from '../partials/hbs/pagination.hbs';
import { onSearchPopularFilms } from './render-popular-film.js';
import myLibraryBtn from './watched-queue-btns';
import onSearchFilm from './header.js';

const { wrapperRefs, arrowLeftRefs, arrowRightRefs, listernerEventRefs } = refs.refs;
const { onWatchedBtnClick, onQueueBtnClick } = myLibraryBtn;

let totalPages = 1;
let page = 1;
const firstPage = 1;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

arrowLeftRefs.addEventListener('click', onClickArrowLeft);
arrowRightRefs.addEventListener('click', onClickArrowRight);
listernerEventRefs.addEventListener('click', onClickButton);

function onGetTotalPages() {
  return localStorage.getItem('totalPages');
}

function onClickArrowLeft() {
  page -= 1;
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
    //? можливо поставити <=
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
  page === 1 || totalPages < countShowSumbols
    ? arrowLeftRefs.classList.add('hidden')
    : arrowLeftRefs.classList.remove('hidden');
}

function onHideArrowRight(page, totalPages) {
  console.log('~ totalPages', totalPages);
  console.log('page', page);
  page === totalPages || totalPages < countShowSumbols
    ? arrowRightRefs.classList.add('hidden')
    : arrowRightRefs.classList.remove('hidden');
}

//* малюємо сторінки та кнопки в залежності від типу сторінки
export function onMarkupPages(page) {
  const pageType = localStorage.getItem('pageType');

  if (!pageType) {
    pageType = 'popular';
  }
  switch (pageType) {
    case 'popular':
      onSearchPopularFilms(page);
      break;
    case 'search by keyword':
      onSearchFilm(page);
      break;
    case 'watched':
      onWatchedBtnClick(page);
      break;
    case 'queue':
      onQueueBtnClick(page);
      break;
  }
  onMarkupButton(page);
}

//* малюємо кнопки
export function onMarkupButton(page) {
  let beforePages;
  let afterPages;
  let buttons = '';
  let totalPages = onGetTotalPages();
  // console.log('~ totalPages', totalPages);

  if (!page) {
    page = 1;
  }

  wrapperRefs.innerHTML = '';

  if (!totalPages) {
    totalPages = 1;
  }
  let nextPage;
  let endPage;

  buttons += buttonsTpl({ id: '', name: 1 });

  if (totalPages > 1) {
    if (page > 4) {
      buttons += buttonsTpl({ id: 'prev', name: MOVE_PAGE_TEXT });

      if (totalPages === page) {
        nextPage = page - 6;
        endPage = totalPages;
      } else {
        nextPage = totalPages - page > 3 ? page - 2 : page - (6 - totalPages + page);
        endPage = page < totalPages - 4 ? page + 2 : totalPages - 2;
      }
    } else {
      buttons += buttonsTpl({ id: '', name: 2 });
      nextPage = totalPages > 2 ? 3 : 2;
      endPage = totalPages >= 7 ? 7 : totalPages;
      afterPages = countShowSumbols;
    }
    if (totalPages > 2) {
      for (let page = nextPage; page <= endPage; page++) {
        buttons += buttonsTpl({ id: '', name: page });
      }
    }
    console.log('~ nextPage', nextPage);
    console.log('totalPages', totalPages);
    console.log('endPage', endPage);
    console.log('page', page);
    if (totalPages > endPage) {
      console.log('not work');
      if (totalPages - countShowSumbols > 0 && totalPages - page > 3) {
        buttons += buttonsTpl({ id: 'next', name: MOVE_PAGE_TEXT });
      } else {
        buttons += buttonsTpl({ id: '', name: totalPages - 1 });
      }
      // if (totalPages > endPage + 1) {
      buttons += buttonsTpl({ id: '', name: totalPages });
      // }
    }
  }

  // console.log('~ buttons', buttons);

  wrapperRefs.innerHTML = buttons;

  const initialPage = document.querySelectorAll('.pagination__link-js');
  for (const button of initialPage) {
    if (button.innerText === String(page)) {
      button.classList.add('pagination__link-current');
      break;
    }
  }
  onHideArrowLeft(page);
  onHideArrowRight(page, totalPages);
  console.log(page);
  console.log(totalPages);
}

onMarkupButton(page);
