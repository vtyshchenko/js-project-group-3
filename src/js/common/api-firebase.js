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
  const app = await initializeApp(firebaseConfig, 'filmoteka');

  return app;
}

export async function login(app, userName, password, email, newUser) {
  if (!userName) {
    userName = 'test';
  }
  if (!email) {
    email = 'test@gmail.com';
  }
  if (!password) {
    password = 'test123';
  }
  let userCredentauls;

  console.log('app', app);
  let auth = await getAuth(app);
  console.log('auth', auth);
  console.log('auth.currentUser', auth.currentUser);
  console.log('auth.AdditionalUserInfo', auth.AdditionalUserInfo);

  if (newUser) {
    userCredentauls = await createNewUser(auth, email, password);
    // updateProfile(auth.currentUser, {
    //   displayName: userName,
    // }).catch(error => {
    //   console.log(error);
    // });
  } else {
    userCredentauls = signInWithExistingUser(auth, email, password);
  }
  console.log(userCredentauls);

  // onAuthStateChanged(userData => {
  //   if (userData) {
  //     onSignIn(userData);
  //   } else {
  //     onError(userData);
  //   }
  // });
  return userCredentauls;
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

// function put(data) {}

// function get() {}

// function update() {}

// function del() {}
