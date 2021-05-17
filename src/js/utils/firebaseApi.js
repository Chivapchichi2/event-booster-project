import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import "firebase/auth";
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
  apiKey: "AIzaSyBoaAG53f8AEmf3WVHR7j3I-ALQmB5xpd0",
  authDomain: "event-booster.firebaseapp.com",
  projectId: "event-booster",
  storageBucket: "event-booster.appspot.com",
  messagingSenderId: "818449618494",
  appId: "1:818449618494:web:7a47487ed0dc533232236f",
  measurementId: "G-KPB67V1QRD"
};

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      alert('Access successful. Welcome aboard!');
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);