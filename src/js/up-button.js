let goTopBtn = document.querySelector('.up-button');
console.log('window.pageYOffset', window.pageYOffset);

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', upButton);
goTopBtn.addEventListener('click', downButton);

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('up-button-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('up-button-show');
  }
}

function upButton() {
  console.log('window.pageYOffset', window.pageYOffset);
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(upButton, 0);
  } else {
    let coords = document.documentElement.clientHeight;
    console.log('coords window.pageYOffset', coords);
    window.scrollBy(0, coords);
    setTimeout(upButton, 0);
  }
}

function downButton() {
  console.log('window.pageYOffset', window.pageYOffset);
  if (window.pageYOffset === 0) {
    let coords = document.documentElement.clientHeight;
    console.log('coords window.pageYOffset', coords);
    window.scrollBy(0, coords);
    setTimeout(upButton, 0);
  }
}
