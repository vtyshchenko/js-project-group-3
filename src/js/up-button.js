let goTopBtn = document.querySelector('.up-button');
let btnScrollDown = document.querySelector('#scroll-down');

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.scrollTopMax;

  console.log(scrolled, coords);
  if (scrolled > 100 && !Array.from(goTopBtn.classList).includes('up-button-show')) {
    goTopBtn.classList.add('up-button-show');
  }
  if (scrolled < 100) {
    goTopBtn.classList.remove('up-button-show');
  }

  if (coords - scrolled > 100) {
    btnScrollDown.classList.add('up-button-show');
  }
  if (coords - scrolled < 100 && !Array.from(btnScrollDown.classList).includes('up-button-show')) {
    btnScrollDown.classList.remove('up-button-show');
  }
}

function upButton() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(upButton, 0);
  }
}

function scrollDown() {
  let windowCoords = document.documentElement.scrollHeight;
  (function scroll() {
    if (window.pageYOffset < windowCoords) {
      window.scrollBy(0, 10);
      setTimeout(scrollDown, 0);
    }
    if (window.pageYOffset > windowCoords) {
      window.scrollTo(0, windowCoords);
    }
  })();
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', upButton);
btnScrollDown.addEventListener('click', scrollDown);
