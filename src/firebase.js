import firebase from "firebase";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyBIZZAd3AM5IAK5jlcJIkhyN21kQLr1Yvw",
  authDomain: "toufik-416ab.firebaseapp.com",
  projectId: "toufik-416ab",
  storageBucket: "toufik-416ab.appspot.com",
  messagingSenderId: "298587771574",
  appId: "1:298587771574:web:57398669d73f5f5b634c17"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
