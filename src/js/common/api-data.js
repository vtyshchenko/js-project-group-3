import { fetchMovieByLang } from '../api-service.js';

function getData() {
  console.log('getData');
  let data = localStorage.getItem('themoviedb');
  if (!data) {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return {};
  }
}

function checkUser(data, user) {
  console.log('checkUser', data, user);
  if (!data) {
    data = { [user]: {} };
  }
  if (!data[user]) {
    data[user] = {};
  }
  return data;
}

// Language
export function getLanguage() {
  console.log('getLanguage');
  let lang = localStorage.getItem('language');
  if (!lang) {
    return 'en-US';
  }

  return lang;
}

export function setLanguage(lang) {
  console.log('setLanguage', lang);
  localStorage.setItem('language', String(lang));
}

// data operation
export function del(user, key, data) {
  console.log('del', user, key, data);
  if (!user || !key || !data) {
    return true;
  }

  let lang = getLanguage();
  let dataLS = getData();
  if (!dataLS || !dataLS[user] || !dataLS[user][lang] || !dataLS[user][lang][key]) {
    return true;
  }

  dataLS[user]['uk-UA'][key] = dataLS[user]['uk-UA'][key].filter(item => item.id != data.id);
  dataLS[user]['en-US'][key] = dataLS[user]['en-US'][key].filter(item => item.id != data.id);

  return saveData(dataLS);
}

export function move(user, keyFrom, keyTo, data) {
  console.log('move', user, keyFrom, keyTo, data);
  let res = del(user, keyFrom, data);
  if (res) {
    res = put(user, keyTo, data);
  }
  return res;
}

export function get(user) {
  console.log('get', user);
  let data = getData();

  if (!data) {
    return [];
  }

  if (!user) {
    return data;
  }

  let lang = getLanguage();
  if (!data[user] || !data[user][lang]) {
    return [];
  } else {
    return data[user][lang];
  }
}

//  дописати
export async function put(user, key, data) {
  console.log('put', user, key, data);
  if (!user) {
    return false;
  }

  let dataSL = getData();
  let lang = getLanguage();

  console.log('dataSL', dataSL);
  console.log('lang', lang);
  console.log('user', user);

  dataSL = checkUser(dataSL, user);
  dataSL[user][lang] = setKey(dataSL[user][lang], key, data);

  let lang2 = lang === 'uk-UA' ? 'en-US' : 'uk-UA';
  let movie = await fetchMovieByLang(data.id, lang2);
  console.log('movie', movie);
  dataSL[user][lang2] = setKey(dataSL[user][lang2], key, movie);

  return saveData(dataSL);
}

function addData(data, value) {
  console.log('addData', data, value);
  let res = -1;
  for (const obj of data) {
    if (obj.id === value.id) {
      res = 1;
    }
  }
  if (res === -1) {
    data.push(value);
  }
}

function saveData(data) {
  console.log('saveData', data);
  try {
    let tmp = JSON.stringify(data);
    localStorage.setItem('themoviedb', tmp);
    return true;
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return false;
  }
}

// user
export function getUser() {
  console.log('getUser');
  let loginUser = localStorage.getItem('loginUser');
  if (!loginUser) {
    loginUser = 'local';
    saveData(loginUser);
  }
  return loginUser;
}

function setKey(data, key, value) {
  console.log('setKey', data, key, value);
  if (!data[key] || !Array.isArray(data[key])) {
    data[key] = [];
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      addData(data[key], item);
    }
  } else {
    addData(data[key], value);
  }
  return data;
}

// function reloadMovieInfo() {
//   let data = getData();
//   let user = getUser();
//   let lang = getLanguage();
//   //
// }
