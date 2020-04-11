import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import config from './secrets'

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp
  .firestore()

export const Auth = firebaseApp
  .auth()

const { Timestamp } = firebase.firestore
export { Timestamp }
