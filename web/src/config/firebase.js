import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyAQJtvTmf-G_mPh7NIspO1VO-rlzmV9ly4',
    authDomain: 'dai-umss.firebaseapp.com',
    databaseURL: 'https://dai-umss.firebaseio.com',
    projectId: 'dai-umss',
    storageBucket: 'dai-umss.appspot.com',
    messagingSenderId: '388420815093',
    appId: '1:388420815093:web:d3ce9f788e76ad3343ddbc',
    measurementId: 'G-HN86WP037E',
}

export default firebase.initializeApp(firebaseConfig)
