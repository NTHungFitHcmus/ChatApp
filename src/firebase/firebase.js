import * as firebase from 'firebase';
 
const config = {
    apiKey: "AIzaSyAiauctP3FOarS8nTgstJCwL_TrymV7-xo",
    authDomain: "chattingreact-1512218.firebaseapp.com",
    databaseURL: "https://chattingreact-1512218.firebaseio.com",
    projectId: "chattingreact-1512218",
    storageBucket: "chattingreact-1512218.appspot.com",
    messagingSenderId: "946184587005"
  };
  firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
 
export { firebase, googleAuthProvider, database as default };
