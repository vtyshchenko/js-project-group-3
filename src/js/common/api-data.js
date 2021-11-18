export function getLanguage() {
  let data = localStorage.getItem('language');
  if (!data) {
    return 'en-US';
  }

  return data;
}

export function setLanguage(lang) {
  localStorage.setItem('language', String(lang));
}

export function del(user, key, data) {
  if (!user) {
    return true;
  }

  let tmp = getData();
  if (!tmp || !tmp[user] || !tmp[user][key]) {
    return true;
  }

  tmp[user][key] = tmp[user][key].filter(item => item.id != data.id);
  return saveData(tmp);
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

  if (!data[user]) {
    return [];
  } else {
    return data[user];
  }
}

export function put(user, key, data) {
  if (!user) {
    return false;
  }

  let tmp = getData();
  tmp = checkUser(tmp, user);
  tmp[user] = setKey(tmp[user], key, data);
  return saveData(tmp);
}

export function getUser() {
  let data = localStorage.getItem('loginUser');
  if (!data) {
    data = 'local';
    saveData(data);
  }
  return data.loginUser;
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
