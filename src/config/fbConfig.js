import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyClAymTE1meqYm_fc-cWlDjmQ7RwFIfkl0",
  authDomain: "notes-57839.firebaseapp.com",
  databaseURL: "https://notes-57839.firebaseio.com",
  projectId: "notes-57839",
  storageBucket: "notes-57839.appspot.com",
  messagingSenderId: "233224406069",
  appId: "1:233224406069:web:87fbcad52e86a51c645d7c",
  measurementId: "G-B3J9WX1PX7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });
// firebase.analytics();

export default firebase;
