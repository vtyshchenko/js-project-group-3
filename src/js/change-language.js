import { setLanguage } from './common/api-data'

//-------------------------------
const btnUA = document.querySelector('#btn-ua')
const btnUS = document.querySelector('#btn-us')

btnUA.addEventListener('click', onChangeLangUA)
btnUS.addEventListener('click', onChangeLangUS)


function onChangeLangUA() {
  setLanguage('uk-UA')
  document.location.reload();
}

function onChangeLangUS() {
  setLanguage('en-US')
  document.location.reload();
}
