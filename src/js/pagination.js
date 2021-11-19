import refs from './common/refs';
import buttonsTpl from '../partials/hbs/pagination.hbs';
import { onSearchPopularFilms } from './render-popular-film.js';
import { onSearch } from './search-by-keyword.js';

import { watchedBtnClick, queueBtnClick } from './watched-queue-btns';

const { wrapperRefs, arrowLeftRefs, arrowRightRefs, listernerEventRefs } = refs.refs;

let totalPages = 1;
let page = 1;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

arrowLeftRefs.addEventListener('click', onClickArrowLeft);
arrowRightRefs.addEventListener('click', onClickArrowRight);
listernerEventRefs.addEventListener('click', onClickButton);

//* General content rendering
export function onMarkupPages(pageNumber) {
  onConditionPageType(pageNumber);
  onMarkupButton(pageNumber);
}

//* Rendering cards by location
async function onConditionPageType(pageNumber) {
  let pageType = onGetPageType();

  if (!pageType) {
    pageType = 'popular';
  }

  switch (pageType) {
    case 'popular':
      await onSearchPopularFilms(pageNumber);
      break;
    case 'search by keyword':
      await onSearch(pageNumber);
      break;
    case 'watched':
      await watchedBtnClick(pageNumber);
      break;
    case 'queue':
      await queueBtnClick(pageNumber);
      break;
  }
}

//* Buttons rendering
export function onMarkupButton(pageNumber) {
  if (!pageNumber) {
    pageNumber = 1;
  }
  onButtonRenderingLogicDangerKeepOut(pageNumber);
  onAddCurrentPage();
  onHideArrowLeft();
  onHideArrowRight();
}

function onGetTotalPages() {
  totalPages = localStorage.getItem('totalPages');
  if (!totalPages) {
    return 1;
  }
  return Number(totalPages);
}

function onGetPageType() {
  let pageType = localStorage.getItem('pageType');
  if (!pageType) {
    return 'popular';
  }
  return pageType;
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
  onButtonClickLogic(e);
  onMarkupPages(page);
}

function onButtonClickLogic(e) {
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
}

function onHideArrowLeft() {
  page === 1 || totalPages < countShowSumbols
    ? arrowLeftRefs.classList.add('visually-hidden')
    : arrowLeftRefs.classList.remove('visually-hidden');
}

function onHideArrowRight() {
  console.log('page', page);
  console.log('totalPages', totalPages);
  console.log('countShowSumbols', countShowSumbols);
  totalPages < countShowSumbols || page === totalPages
    ? arrowRightRefs.classList.add('visually-hidden')
    : arrowRightRefs.classList.remove('visually-hidden');
}

function onButtonRenderingLogicDangerKeepOut(pageNumber) {
  wrapperRefs.innerHTML = '';
  let buttons = '';
  totalPages = onGetTotalPages();

  if (!pageNumber) {
    pageNumber = 1;
  }

  if (!totalPages) {
    totalPages = 1;
  }
  let nextPage;
  let endPage;

  buttons += buttonsTpl({ id: '', name: 1 });

  if (totalPages > 1) {
    if (pageNumber > 4) {
      buttons += buttonsTpl({ id: 'prev', name: MOVE_PAGE_TEXT });

      if (totalPages === pageNumber) {
        nextPage = pageNumber - 6;
        endPage = totalPages;
      } else {
        nextPage =
          totalPages - pageNumber > 3 ? pageNumber - 2 : pageNumber - (6 - totalPages + pageNumber);
        endPage = pageNumber < totalPages - 4 ? pageNumber + 2 : totalPages - 2;
      }
    } else {
      buttons += buttonsTpl({ id: '', name: 2 });
      nextPage = totalPages > 2 ? 3 : 2;
      endPage = totalPages >= 7 ? 7 : totalPages;
    }
    if (totalPages > 2) {
      for (let pageNum = nextPage; pageNum <= endPage; pageNum += 1) {
        buttons += buttonsTpl({ id: '', name: pageNum });
      }
    }
    if (totalPages > endPage) {
      if (totalPages - countShowSumbols > 0 && totalPages - page > 3) {
        buttons += buttonsTpl({ id: 'next', name: MOVE_PAGE_TEXT });
      } else {
        buttons += buttonsTpl({ id: '', name: totalPages - 1 });
      }
      buttons += buttonsTpl({ id: '', name: totalPages });
    }
  }

  wrapperRefs.innerHTML = buttons;
}

function onAddCurrentPage() {
  const initialPage = document.querySelectorAll('.pagination__link-js');

  for (const button of initialPage) {
    if (button.innerText === String(page)) {
      button.classList.add('pagination__link-current');
      break;
    }
  }
}

onMarkupButton(page);
