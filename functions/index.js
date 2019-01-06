const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore()
firestore.settings({timestampsInSnapshots: true})

const user = functions.auth.user()

exports.insertUserEntry = user.onCreate((user) => {
  const { uid, email } = user
  const userdata = { email }

  return firestore.collection('user').doc(`${uid}`).set(userdata)
})

exports.removeUserEntry = user.onDelete((user) => {
  const { uid } = user

  return firestore.collection('user').doc(`${uid}`).delete()
})

const messagecollection = functions.firestore.document('message/{id}')
exports.sendNotification = messagecollection.onCreate((snap, context)=> {
  //to user uid
  // send notification
  
})