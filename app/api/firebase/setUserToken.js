import firebase from './firebase'

export default (token, uid) => {
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .update({
      token
    })
}