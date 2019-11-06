// .Set can take any datatype in, it can just be a single string or an object/array/boolean/number
// database.ref().set('This is my data')

// database.ref('age').set(27)
// database.ref('location/city').set('New York')

// database.ref('attributes').set({
//     height: 1.83,
//     weight: 70
// }).then(() => {
//     console.log('Other data is also saved!')
// }).catch((error) => {
//     console.log('Other data failed to save', error)
// })

// // Also a way to remove something
// database.ref('isSingle').set(null)

// // What gets back from on is the callback function
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// }, (error) => {
//     console.log('Error with data fetching', error)
// })

// setTimeout(() => {
//     database.ref().update({
//         age: 29
//     })
// }, 3500)

// setTimeout(() => {
//     database.ref().off(onValueChange)
// }, 7000)

// setTimeout(() => {
//     database.ref().update({
//         age: 30
//     })
// }, 10500)

// database.ref().set({
//     name: 'Richard Verbraak',
//     age: 25,
//     stresslevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Delft',
//         country: 'Netherlands'
//     }
// }).then(() => {
//     console.log('Data is saved!')
// }).catch((error) => {
//     console.log('This failed to save', error)
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// const isSingle = database.ref('isSingle')
// isSingle.remove()
//     .then(() => {
//         console.log('Remove succesful')
//     }).catch((error) => {
//         console.log('Unsuccesful remove', error)
//     })
