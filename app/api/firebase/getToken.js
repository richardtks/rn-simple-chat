import firebase from './firebase'

export default async (uid) => {
  const user = await firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .get()

  const { token } = user.data()

  return token
}