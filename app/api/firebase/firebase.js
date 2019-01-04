// Import the Firebase modules that you need in your app.
import firebase from 'react-native-firebase'

import config from './config'

if (!firebase.apps.length) firebase.initializeApp(config)

export default firebase
