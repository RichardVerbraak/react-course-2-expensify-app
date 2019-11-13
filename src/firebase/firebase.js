// Imports all * named exports from firebase which you can now access via a firebase variable
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

// Setup firebase to authenticate with Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default}

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').push({
//     description: 'Electricity bill',
//     note: 'Electricity',
//     amount: 45091,
//     createdAt: 849239
// })

// childSnapshot is the child data inside of expenses
// keys are basically the firebase id's
// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val() 
//         })
//     })
//     console.log(expenses)
// })

// database.ref('expenses').push({
//     description: 'TESSSSSTT note',
//     note: 'Empty note',
//     amount: 0,
//     createdAt: 0
// })

// Makes notes section and then pushes on objects with a random generated ID (by firebase) and these key/value pairs
// database.ref('notes').push({
//     title: 'Course topics',
//     body: 'React.js'
// })


