import { initializeApp } from 'firebase/app';
import 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCGJzBOsXG8poQB0hOgZgBuDv87LmyxPwk',
  authDomain: 'project-filmoteka.firebaseapp.com',
  projectId: 'project-filmoteka',
  storageBucket: 'project-filmoteka.appspot.com',
  messagingSenderId: '752565238788',
  appId: '1:752565238788:web:5f9744ba69c8ecc4964951',
  measurementId: 'G-VENZM40NT5',
};

export async function init() {
  return initializeApp(firebaseConfig, 'filmoteka');
}

export function login(app, email, password, newUser) {
  if (!user) {
    email = 'test@gmail.com';
  }
  if (!password) {
    password = 'test123';
  }
  let uaerCredentauls;

  let auth = getAuth(app);
  console.log('auth.currentUser', auth.currentUser);

  if (newUser) {
    uaerCredentauls = signInWithExistingUser(auth, email, password);
  } else {
    uaerCredentauls = createNewUser(auth, email, password);
  }
  console.log(uaerCredentauls);

  onAuthStateChanged(userData => {
    if (userData) {
      onSignIn(userData);
    } else {
      onError(userData);
    }
  });
}

async function createNewUser(auth, email, password) {
  // new user
  let res = await createUserWithEmailAndPassword(auth, email, password)
    .then(onSignIn)
    .catch(onError);
  if (!res) {
    res = {};
  }
  return res;
}

async function signInWithExistingUser(auth, email, password) {
  // existing users
  let res = await signInWithEmailAndPassword(auth, email, password).then(onSignIn).catch(onError);
  if (!res) {
    res = {};
  }
  return res;
}

function onError(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(`errorCode = ${errorCode}\nerrorMessage = ${errorMessage}`);
}

function onSignIn(userCredential) {
  const user = userCredential.user;
  console.log(`user = ${user}`);
  return user;
}
