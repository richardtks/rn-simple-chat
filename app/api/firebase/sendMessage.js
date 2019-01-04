import firestore from './firestore'

export default async (message) => {
  firestore.collection('messages').add(message)
}