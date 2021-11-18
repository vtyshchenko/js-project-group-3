import refs from './common/refs';
import buttonsTpl from '../partials/hbs/pagination.hbs';
import { onSearchPopularFilms } from './render-popular-film.js';
import { onWatchedBtnClick, onQueueBtnClick } from './watched-queue-btns';
import { onSearch } from './search-by-keyword.js';

const { wrapperRefs, arrowLeftRefs, arrowRightRefs, listernerEventRefs } = refs.refs;

let totalPages = 1;
let page = 1;
const countShowSumbols = 9;
const MOVE_PAGE_TEXT = '...';

arrowLeftRefs.addEventListener('click', onClickArrowLeft);
arrowRightRefs.addEventListener('click', onClickArrowRight);
listernerEventRefs.addEventListener('click', onClickButton);

//* General content rendering
export function onMarkupPages(page) {
  onConditionPageType(page);
  onMarkupButton(page);
}

//* Rendering cards by location
async function onConditionPageType(page) {
  let pageType = onGetPageType();

  if (!pageType) {
    pageType = 'popular';
  }

  switch (pageType) {
    case 'popular':
      await onSearchPopularFilms(page);
      break;
    case 'search by keyword':
      await onSearch(page);
      break;
    case 'watched':
      await onWatchedBtnClick(page);
      break;
    case 'queue':
      await onQueueBtnClick(page);
      break;
  }
}

//* Buttons rendering
export function onMarkupButton(page) {
  if (!page) {
    page = 1;
  }
  onButtonRenderingLogicDangerKeepOut(page);
  onAddCurrentPage(page);
  onHideArrowLeft(page, totalPages);
  onHideArrowRight(page, totalPages);
}

function onGetTotalPages() {
  totalPages = localStorage.getItem('totalPages');
  if (!totalPages) {
    return 1;
  }
  return totalPages;
}

function onGetPageType() {
  let pageType = localStorage.getItem('pageType');
  if (!pageType) {
    return (pageType = 'popular');
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

function onHideArrowLeft(page, totalPages) {
  page === 1 || totalPages < countShowSumbols
    ? arrowLeftRefs.classList.add('visually-hidden')
    : arrowLeftRefs.classList.remove('visually-hidden');
}

function onHideArrowRight(page, totalPages) {
  page === totalPages || totalPages < countShowSumbols
    ? arrowRightRefs.classList.add('visually-hidden')
    : arrowRightRefs.classList.remove('visually-hidden');
}

function onButtonRenderingLogicDangerKeepOut(page) {
  wrapperRefs.innerHTML = '';
  let buttons = '';
  let totalPages = onGetTotalPages();

  if (!page) {
    page = 1;
  }

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
    }
    if (totalPages > 2) {
      for (let page = nextPage; page <= endPage; page++) {
        buttons += buttonsTpl({ id: '', name: page });
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

function onAddCurrentPage(page) {
  const initialPage = document.querySelectorAll('.pagination__link-js');

  for (const button of initialPage) {
    if (button.innerText === String(page)) {
      button.classList.add('pagination__link-current');
      break;
    }
  }
}

onMarkupButton(page);
