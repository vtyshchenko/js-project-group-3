let goTopBtn = document.querySelector('.up-button');

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
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(upButton, 0);
  }
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', upButton);
