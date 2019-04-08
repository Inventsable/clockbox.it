import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
    apiKey: process.env.VUE_APP_FIREBASE_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();