import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import firebaseFunctions from './firebaseRegistrationHelpers';

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


const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      firebaseFunctions.closeRegModal();
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

export default {
  initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {           
            firebaseFunctions.signedUser(user.photoURL, user.displayName);
          } else {
            firebaseFunctions.noSignedUser();
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