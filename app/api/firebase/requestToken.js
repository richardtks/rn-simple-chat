import firebase from './firebase'

export default async () => {
  const fcm = firebase.messaging()
  fcm.requestPermission()

  const token = await fcm.getToken()

  return token
}

