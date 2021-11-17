import refs from './common/refs';
const { backdropRefs, modalsWrapperRefs, closeBtnModalRefs, openModalBtnRefs, modalRefs} = refs.refs
    openModalBtnRefs.addEventListener('click', onOpenTeamBtn);

function onOpenTeamBtn() {
    modalRefs.classList.toggle('visually-hidden');
    modalRefs.classList.toggle('is-open')
    closeBtnModalRefs.classList.add('team-btn-close');
    backdropRefs.classList.remove('visually-hidden')
    window.addEventListener('keydown', onEcsKeyPress)
  closeBtnModalRefs.addEventListener('click', onCloseTeamBtn);
  backdropRefs.addEventListener('click', onCloseTeamBtn)
  document.body.classList.toggle('modal-open');

  modalsWrapperRefs.classList.remove('visually-hidden');
  modalsWrapperRefs.classList.add('is-open');
  modalsWrapperRefs.classList.remove('modal-wrapper-film');
  modalsWrapperRefs.classList.remove('modal-wrapper-trailer');

  let theme = localStorage.getItem('theme');
  if (theme === 'dark-theme') {
    modalRefs.style.color =  'rgb(255, 255, 255)';
      modalRefs.style.backgroundColor = 'rgb(5, 5, 5)';
  } else {
    closeBtnModalRefs.style.fill = 'rgb(0, 0, 0)'
    }

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
    window.removeEventListener('keydown', onEcsKeyPress)
    modalRefs.classList.toggle('visually-hidden');
    modalRefs.classList.toggle('is-open')
    backdropRefs.classList.add('visually-hidden')
       closeBtnModalRefs.removeEventListener('click', onCloseTeamBtn);
 backdropRefs.removeEventListener('click', onCloseTeamBtn)
  document.body.classList.remove('modal-open');

   modalsWrapperRefs.classList.add('visually-hidden');
  modalsWrapperRefs.classList.remove('is-open');
    modalsWrapperRefs.classList.add('modal-wrapper-film');
  modalsWrapperRefs.classList.add('modal-wrapper-trailer');
}

function onEcsKeyPress(e) {

    if (e.code === 'Escape') {
    removeonCloseTeamBtn()
  }

}