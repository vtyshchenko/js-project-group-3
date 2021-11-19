import { fetchMovieByLang } from '../api-service.js';
import { getDb, writeNewData } from '../common/api-firebase';

function getData() {
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
  let lang = localStorage.getItem('language');
  if (!lang) {
    return 'en-US';
  }

  return lang;
}

export function setLanguage(lang) {
  localStorage.setItem('language', String(lang));
}

// data operation
export function del(user, key, data) {
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
  let res = del(user, keyFrom, data);
  if (res) {
    res = put(user, keyTo, data);
  }
  return res;
}

export function get(user) {
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
  if (!user) {
    return false;
  }

  let dataSL = getData();
  let lang = getLanguage();

  dataSL = checkUser(dataSL, user);
  if (!dataSL[user][lang]) {
    dataSL[user][lang] = {};
  }

  dataSL[user][lang] = setKey(dataSL[user][lang], key, data);

  let lang2 = lang === 'uk-UA' ? 'en-US' : 'uk-UA';
  let movie = await fetchMovieByLang(data.id, lang2);
  if (!dataSL[user][lang2]) {
    dataSL[user][lang2] = {};
  }

  dataSL[user][lang2] = setKey(dataSL[user][lang2], key, movie);

  if (user != 'local') {
    let db = await getDb(app);
    let body = get();
    let key = user.split('@')[0];
    await writeNewData(db, key, body);
  }
  return saveData(dataSL);
}

function addData(data, value) {
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
  let loginUser = localStorage.getItem('loginUser');
  if (!loginUser) {
    loginUser = 'local';
    localStorage.setItem('loginUser', loginUser);
  }
  return loginUser;
}

function setKey(data, key, value) {
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
