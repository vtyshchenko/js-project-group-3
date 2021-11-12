import refs from './common/refs';
const { backdropRefs, closeModalBtnRefs, openModalBtnRefs, modalRefs} = refs.refs


  function onOpenTeamBtn() {
    modalRefs.classList.toggle('is-hidden');
    modalRefs.classList.toggle('is-open')
    backdropRefs.classList.remove('visually-hidden')
  window.addEventListener('keydown', onEcsKeyPress)
  }

 closeModalBtnRefs.addEventListener('click', onCloseTeamBtn);
openModalBtnRefs.addEventListener('click', onOpenTeamBtn);


function onCloseTeamBtn() {
  window.removeEventListener('keydown', onEcsKeyPress)
  modalRefs.classList.remove('is-open')
   openModalBtnRefs.removeEventListener('click', onOpenTeamBtn);
  backdropRefs.classList.toggle('visually-hidden')
  
}

  function onEcsKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  onCloseTeamBtn()
}