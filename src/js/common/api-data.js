export function get(user) {
  if (!user) {
    return [];
  }

  let data = getData();
  if (!data) {
    return [];
  } else {
    if (!data[user]) {
      return [];
    } else {
      return data[user];
    }
  }
}

export function put(user, data) {
  if (!user) {
    return false;
  }

  let tmp = getData();
  if (tmp) {
    tmp[user] = data;
  } else {
    tmp = { [user]: data };
  }
  console.log('tmp', tmp);
  try {
    tmp = JSON.stringify(tmp);
    localStorage.setItem('themoviedb', tmp);
    return true;
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return false;
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
