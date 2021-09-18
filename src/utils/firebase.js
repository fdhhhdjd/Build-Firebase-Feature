import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyCdrUqjRl1duP4_RcpIQeIqOlvLMLVm1iE",
  authDomain: "login-32fbb.firebaseapp.com",
  databaseURL: "https://login-32fbb-default-rtdb.firebaseio.com",
  projectId: "login-32fbb",
  storageBucket: "login-32fbb.appspot.com",
  messagingSenderId: "625865760805",
  appId: "1:625865760805:web:30ae8ebe4b3f08fe935fcc",
};
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
