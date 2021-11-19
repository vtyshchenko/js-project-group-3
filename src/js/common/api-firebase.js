import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';

// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import {
  getAuth,
  updateProfile,
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
  databaseURL: 'https://project-filmoteka.firebaseio.com',
};

export async function init() {
  const app = await initializeApp(firebaseConfig, 'filmoteka');

  return app;
}

export async function getDb(app) {
  const db = getDatabase(
    app,
    'https://project-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/',
  );
  return db;
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

  let auth = await getAuth(app);
  console.log('auth.currentUser', auth.currentUser);
  console.log('auth.AdditionalUserInfo', auth.AdditionalUserInfo);

  if (newUser) {
    userCredentauls = await createNewUser(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: userName,
    }).catch(error => {
      console.log(error);
    });
  } else {
    userCredentauls = await signInWithExistingUser(auth, email, password);
  }

  onAuthStateChanged(auth, userData => {
    console.log('userData', userData);
    if (userData) {
      onSignIn(userData);
    } else {
      onError(userData);
    }
  });
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
  console.log('userCredential.email', userCredential.email);
  return userCredential;
}

export async function writeNewData(db, username, body) {
  const updates = {};
  updates[username] = body;
  return await update(ref(db), updates);
}
