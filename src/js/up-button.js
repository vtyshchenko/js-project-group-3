let goTopBtn = document.querySelector('.up-button');
let btnScrollDown = document.querySelector('#scroll-down');
console.log('btnScrollDown', btnScrollDown);
console.log('document.documentElement', document.documentElement);

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.scrollTopMax;

  if (scrolled > 100 && !Array.from(goTopBtn.classList).includes('up-button-show')) {
    goTopBtn.classList.add('up-button-show');
  }
  if (scrolled < 100) {
    goTopBtn.classList.remove('up-button-show');
  }

  if (coords - scrolled > 100) {
    btnScrollDown.classList.add('up-button-show');
  }
  console.log('classes', btnScrollDown.classList);
  if (coords - scrolled < 100 && !Array.from(btnScrollDown.classList).includes('up-button-show')) {
    btnScrollDown.classList.remove('up-button-show');
  }
  console.log('coords', coords, scrolled);
  console.log('coords - scrolled', coords - scrolled);
}

function upButton() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(upButton, 0);
  }
}

function scrollDown() {
  let coords = document.documentElement.scrollTop;
  console.log(window.pageYOffset);
  console.log('document.documentElement.clientHeight', coords);
  if (window.pageYOffset < coords) {
    window.scrollBy(0, 10);
    setTimeout(scroll, 0);
  }
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', upButton);
btnScrollDown.addEventListener('click', scrollDown);
