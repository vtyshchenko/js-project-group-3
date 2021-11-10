export function del(user, key, data) {
  if (!user) {
    return false;
  }

  let tmp = getData();
  if (!tmp || !tmp[user] || !tmp[user][key]) {
    return false;
  }

  tmp[user][key] = tmp[user][key].filter(item => item != data);
  return saveData(tmp);
}

export function move(user, key_from, key_to, data) {
  let res = del(user, key_from, data);
  if (res) {
    res = put(user, key_to, data);
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
  if (data.indexOf(value) === -1) {
    data.push(value);
  }
}

function getData() {
  let data = localStorage.getItem('themoviedb');
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return null;
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
