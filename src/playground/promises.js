// You can only resolve/reject once
// Only one argument can be resolved, if you need to pass in multiple args then pass in an object
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            age: 25,
            location: 'Delft'
        })
        reject('Something went wrong')   
    }, 3000)
     
})

console.log('before')

promise.then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})

console.log('after')