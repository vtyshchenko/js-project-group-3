export function get(user) {
  let data = getData();

  if (!data) {
    return [];
  } else {
    if (!user) {
      return data;
    } else {
      if (!data[user]) {
        return [];
      } else {
        return data[user];
      }
    }
  }
}

export function put(user, key, data) {
  if (!user) {
    return false;
  }

  let tmp = getData();
  tmp = checkUser(tmp, user);
  tmp[user] = setKey(tmp[user], key, data);
  try {
    tmp = JSON.stringify(tmp);
    localStorage.setItem('themoviedb', tmp);
    return true;
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return false;
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
  console.log('data', data);
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
