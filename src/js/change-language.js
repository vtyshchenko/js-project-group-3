import { setLanguage } from './common/api-data'
import refs from './common/refs'

const { btnHomeRefs, btnLibrRefs } = refs.refs
const btnUA = document.querySelector('#btn-ua')
const btnUS = document.querySelector('#btn-us')

btnUA.addEventListener('click', onChangeLangUA)
btnUS.addEventListener('click', onChangeLangUS)


function onChangeLangUA() {
    setLanguage('uk-UA')
    location.reload()
}

function onChangeLangUS() {
    setLanguage('en-US')
    location.reload();
}










