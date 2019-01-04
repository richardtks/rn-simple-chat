import firebase from './firebase'

firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase.firestore()
