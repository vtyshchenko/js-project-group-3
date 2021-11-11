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
  console.log('initializeApp', initializeApp);
  const app = initializeApp(firebaseConfig, 'filmoteka');
  console.log('app', app);
  let auth = getAuth(app);
  console.log('auth', auth);
  console.log('auth.currentUser', auth.currentUser);

  if (!auth.currentUser) {
    let UserCredential = await createUserWithEmailAndPassword(auth, 'test@gmail.com', 'test123')
      .then(result => {
        console.log('UserCredential = ', result);
      })
      .catch(console.log);
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user', user);
    } else {
      console.log('error user', user);
    }
  });
}
