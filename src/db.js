import * as firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDnUzWmZCGj-RdU5G1gD6zsxpaqA0dlkc4',
  databaseURL: 'https://small-chat-3d69f.firebaseio.com'
})

export default app.database()
