import { setLanguage } from './common/api-data'
import refs from './common/refs'
import { getLanguage } from './common/api-data'

const{ ukrLangSvgRefs, engLangSvgRefs, btnHomeRefs, btnLibrRefs, inputSearchRefs, btnLogin, headerWatchedBtnRefs,
  headerQueueBtnRefs, watchedBtnRefs, queueBtnRefs } = refs.refs

ukrLangSvgRefs.addEventListener('click', onChangeLangUA)
engLangSvgRefs.addEventListener('click', onChangeLangUS)

function onChangeLangUA() {
    setLanguage('uk-UA')
    location.reload()
}

function onChangeLangUS() {
    setLanguage('en-US')
    location.reload();
}

function ukrLangSvgClick() {
  if (localStorage.getItem('language') === 'uk-UA') {
    btnHomeRefs.innerHTML='Додому'
    btnLibrRefs.innerHTML ='Моя бібліотека'
    inputSearchRefs.placeholder = 'Шукати фільми'
    btnLogin.innerHTML = 'Увійти'
    headerWatchedBtnRefs.innerHTML= 'Переглянуте'
    headerQueueBtnRefs.innerHTML = 'У черзі'
    watchedBtnRefs.innerHTML = 'До переглянутих'
    queueBtnRefs.innerHTML = 'Дивитися потім';
    ukrLangSvgRefs.style.border = '1px solid #ff6b01'
  }
}

function engLangSvgClick(){
  if (localStorage.getItem('language') === 'en-US') {
    engLangSvgRefs.style.border = '1px solid #ff6b01'
  }
}

getLanguage()
ukrLangSvgClick()
engLangSvgClick()