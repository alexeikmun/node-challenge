import firebase from 'firebase-admin'
import account from '../../firebase.json'

const setupFirebase = () => firebase.initializeApp({
  credential: firebase.credential.cert(account),
  storageBucket: 'you-can-707f9.appspot.com/'
})

export default setupFirebase
