import refs from './common/refs';
const { backdropRefs, closeModalBtnRefs, openModalBtnRefs, modalRefs} = refs.refs
    openModalBtnRefs.addEventListener('click', onOpenTeamBtn);

function onOpenTeamBtn() {
    modalRefs.classList.toggle('visually-hidden');
    modalRefs.classList.toggle('is-open')
    backdropRefs.classList.remove('visually-hidden')
    window.addEventListener('keydown', onEcsKeyPress)
  closeModalBtnRefs.addEventListener('click', onCloseTeamBtn);
  backdropRefs.addEventListener('click', onCloseTeamBtn)
  document.body.classList.toggle('modal-open');

  }

function onCloseTeamBtn(e) {

  let classes = e.target.classList
  if (classes.contains('backdrop') || classes.contains('team__modal-button') || classes.contains('team__modal-icon') || classes.contains('tea__icon-use')) {
    removeonCloseTeamBtn()
}
  
}

function removeonCloseTeamBtn() {
    window.removeEventListener('keydown', onEcsKeyPress)
    modalRefs.classList.toggle('visually-hidden');
    modalRefs.classList.toggle('is-open')
    backdropRefs.classList.add('visually-hidden')
       closeModalBtnRefs.removeEventListener('click', onCloseTeamBtn);
 backdropRefs.removeEventListener('click', onCloseTeamBtn)
   document.body.classList.remove('modal-open');
}

function onEcsKeyPress(e) {

    if (e.code === 'Escape') {
    removeonCloseTeamBtn()
  }

}