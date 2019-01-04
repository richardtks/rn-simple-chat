import firebase from './firebase'

export default async (email, password, displayName) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)

  firebase.auth().currentUser.updateProfile({
    displayName
  })

  return firebase.auth().currentUser 
}
