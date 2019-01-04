import firestore from './firestore'

export default async (username) => {
  // TODO: remove dummy username
  username = 'Test'
  try {
    const contactListSnapshot = await firestore
      .collection('contact')
      .doc(username)
      .collection('contactList')
      .orderBy('name')
      .get()

    let contactList = []
    contactListSnapshot.forEach((doc) => {
      contactList.push(doc.data().name)
    })

    return contactList
  } catch (err) {
    console.log('Error occured', err)
  }
}
