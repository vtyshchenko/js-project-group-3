// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

export default function init(email, password) {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyCGJzBOsXG8poQB0hOgZgBuDv87LmyxPwk',
    authDomain: 'project-filmoteka.firebaseapp.com',
    projectId: 'project-filmoteka',
    storageBucket: 'project-filmoteka.appspot.com',
    messagingSenderId: '752565238788',
    appId: '1:752565238788:web:5f9744ba69c8ecc4964951',
    measurementId: 'G-VENZM40NT5',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // console.log('app', app);
  // const analytics = getAnalytics(app);
  // console.log('analytics', analytics);

  const auth = getAuth(auth, email, password);
  auth.languageCode = 'ua';

  createNewUser();
  // existing users
  signInWithExistingUser(auth, email, password);

  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`uid = ${uid}`);
    } else {
      console.log('Buy');
    }
  });
}

function createNewUser(auth, email, password) {
  // new user
  createUserWithEmailAndPassword(auth, email, password).then(onSignIn).catch(onError);
}

function signInWithExistingUser(auth, email, password) {
  // existing users
  signInWithEmailAndPassword(auth, email, password).then(onSignIn).catch(onError);
}

function onError(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(`errorCode = ${errorCode}\nerrorMessage = ${errorMessage}`);
}

function onSignIn(userCredential) {
  // Signed in
  const user = userCredential.user;
  console.log(`user = ${user}`);
  return user;
}

function signInGoogleAcc() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user, token };
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(
        `errorCode = ${errorCode}\nerrorMessage = ${errorMessage}\nemail = ${email}\ncredential = ${credential}\n`,
      );
    });
}
