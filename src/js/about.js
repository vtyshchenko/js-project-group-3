import refs from './common/refs';
const { backdropRefs, openModalBtnRefs, modalRefs} = refs.refs
openModalBtnRefs.addEventListener('click', onOpenTeamBtn);
    
const closeModalAboutRefs = modalRefs.querySelector('.close__button');


 
function getThemes() {
  let theme = localStorage.getItem('theme');

    if (theme === 'dark-theme') {
    themeStyleModal('inherit', 'rgb(5, 5, 5)', 'rgb(255, 255, 255)')
  } else {
    themeStyleModal('rgb(0, 0, 0)', '', '')
    }
}

function onOpenTeamBtn() {
addEventListeners()
styleClassList()
getThemes()
 
}

function styleClassList() {
  modalRefs.classList.toggle('visually-hidden');
  modalRefs.classList.toggle('is-open')
  closeModalAboutRefs.classList.add('team-btn-close');
  backdropRefs.classList.remove('visually-hidden')
  document.body.classList.toggle('modal-open');
  
}

function addEventListeners() {
  backdropRefs.addEventListener('click', onCloseTeamBtn)
      window.addEventListener('keydown', onEcsKeyPress)
  closeModalAboutRefs.addEventListener('click', onCloseTeamBtn);
}

function themeStyleModal(fill, backgroundColor, color) {
  closeModalAboutRefs.style.fill = fill;
  modalRefs.style.backgroundColor = backgroundColor;
  modalRefs.style.color = color
}

function onCloseTeamBtn(e) {
  let classes = e.target.classList
   if (
    classes.contains('backdrop') ||
    classes.contains('close-button__icon') ||
    classes.contains('close__button') ||
    classes.contains('use-close-button')
  ) {
    removeonCloseTeamBtn()
}
  
}


function removeonCloseTeamBtn() {
    modalRefs.classList.toggle('visually-hidden');
    modalRefs.classList.toggle('is-open')
    backdropRefs.classList.add('visually-hidden')
  document.body.classList.remove('modal-open');
  removeEventListeners()
}

function removeEventListeners() {
  window.removeEventListener('keydown', onEcsKeyPress);
  closeModalAboutRefs.removeEventListener('click', onCloseTeamBtn);
  backdropRefs.removeEventListener('click', onCloseTeamBtn);
}

function onEcsKeyPress(e) {

    if (e.code === 'Escape') {
    removeonCloseTeamBtn()
  }

}