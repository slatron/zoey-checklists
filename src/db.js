import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBBjaxqgNwl6krH0aqNfINaWhUyKwVBZDk",
  authDomain: "zoey-checklists.firebaseapp.com",
  databaseURL: "https://zoey-checklists.firebaseio.com",
  projectId: "zoey-checklists",
  storageBucket: "zoey-checklists.appspot.com",
  messagingSenderId: "1071226450562",
  appId: "1:1071226450562:web:40ff1ae299ff374a003a9b"
}

export const db = firebase
  .initializeApp(config)
  .firestore()

const { Timestamp } = firebase.firestore
export { Timestamp }
