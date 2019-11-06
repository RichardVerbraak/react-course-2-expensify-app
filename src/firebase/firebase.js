// Imports all * named exports from firebase which you can now access via a firebase variable
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCnuCtpu4EHPt9V9Js4NFOo2Ke-rgU3Aek",
    authDomain: "expensify-f88a1.firebaseapp.com",
    databaseURL: "https://expensify-f88a1.firebaseio.com",
    projectId: "expensify-f88a1",
    storageBucket: "expensify-f88a1.appspot.com",
    messagingSenderId: "839958163793",
    appId: "1:839958163793:web:295173b4c2bf2ab4af2370",
    measurementId: "G-TMZSPLSGEG"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default}

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


