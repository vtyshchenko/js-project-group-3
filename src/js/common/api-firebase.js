// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
const analytics = getAnalytics(app);
