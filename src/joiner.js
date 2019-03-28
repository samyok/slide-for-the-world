import * as firebase from 'firebase/app';
import 'firebase/auth';
import './login.css'
// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyA4155X-hrZ49f2SjAhx5R0ex8Rk4w70gY",
    authDomain: "slidefortheworld.firebaseapp.com",
    databaseURL: "https://slidefortheworld.firebaseio.com",
    projectId: "slidefortheworld",
    storageBucket: "slidefortheworld.appspot.com",
    messagingSenderId: "1072210382738"
});
window.firebase = firebase;
firebase.auth().signInAnonymously().then(u => console.log(u.user.uid));
