import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2UCLObGyCeKv9NHnzze51rt59aCd5wvk",
    authDomain: "salesdashboard-5b871.firebaseapp.com",
    projectId: "salesdashboard-5b871",
    storageBucket: "salesdashboard-5b871.appspot.com",
    messagingSenderId: "830058232095",
    appId: "1:830058232095:web:21d4da792c31ec4f98582a"
  };
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;