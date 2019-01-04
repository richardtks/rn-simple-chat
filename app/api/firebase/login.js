import firebase from './firebase'

export default async (email, password) => {
  const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(email, password)
  // If no error being caught, then return uid
  console.log(firebase.auth().currentUser.displayName)
  return uid 
}
