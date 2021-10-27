import firebase from 'firebase-admin'
import account from '../../firebase.json'

const setupFirebase = () => firebase.initializeApp({
  credential: firebase.credential.cert(account)
})

export default setupFirebase
