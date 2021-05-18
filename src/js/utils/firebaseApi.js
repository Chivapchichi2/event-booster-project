// import refs from '../utils/refs';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
// import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBoaAG53f8AEmf3WVHR7j3I-ALQmB5xpd0',
  authDomain: 'event-booster.firebaseapp.com',
  projectId: 'event-booster',
  storageBucket: 'event-booster.appspot.com',
  messagingSenderId: '818449618494',
  appId: '1:818449618494:web:7a47487ed0dc533232236f',
  measurementId: 'G-KPB67V1QRD',
};

firebase.initializeApp(firebaseConfig);

// refs.iconOut.style.display = 'none';
// refs.firebaseContainer.style.display = 'none';
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      alert('Access successful. Welcome aboard!');
      // refs.iconOut.style.display = 'block';
      // refs.firebaseContainer.style.display = 'none';
      // refs.iconIn.style.display = 'none';

      return false;
    },
    uiShown: function () {},
  },
  signInFlow: 'popup',
  signInSuccessUrl: '#',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://www.termsfeed.com/live/255b9d74-2174-485a-b58c-eb186fe5639f',
  privacyPolicyUrl:
    'https://www.privacypolicies.com/live/44ccb766-aaf4-4d9b-a5b3-584ef9c0a4ed',
};

// ui.start('#firebaseui-auth-container', uiConfig);

// refs.iconIn.addEventListener('click', closeRegistrationModal);

// function closeRegistrationModal() {
//   refs.firebaseContainer.style.display = 'block';
// }

// refs.iconIn.addEventListener('click', logOut);

// function logOut() {
//   refs.iconOut.style.display = 'none';
//   refs.iconIn.style.display = 'block';
//   firebase.auth().signOut();
// }
// function initApp() {
//         firebase.auth().onAuthStateChanged(function(user) {
//           if (user) {
//             // User is signed in.
//             signedUser(user.photoURL, user.displayName);
//           } else {
//             // User is signed out.
//             noSignedUser();
//           }
//         }, function(error) {
//           console.log(error);
//         });
// }

// function signOut() {
//   firebase.auth().signOut();
//   document.getElementById('home').click();
// }
export default {
  initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            // signedUser(user.photoURL, user.displayName);
          } else {
            // User is signed out.
            // noSignedUser();
          }
        }, function(error) {
          console.log(error)
        })
  },
  signOut() {
    firebase.auth().signOut()
  },
  start(container) {
    ui.start(container, uiConfig)
  },
}