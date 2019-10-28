//////
// Object destructuring
//////

const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temp: 92
    }
}

// It defaults if there was no name
const { name: firstName = 'Anonymous', age } = person
// const name = person.name
// const age = person.age

console.log(`${firstName} is ${age}.`)

// Temp: temperature grabs the temp variable of person.location and now renames it to temperature in the obj
const { city, temp: temperature } = person.location
if (city && temperature) {
    console.log(`It currently is ${temperature} degrees in ${city}`)
}

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const { name: publisherName = 'Self-Published'} = book.publisher

console.log(publisherName)

//////
// Array Destructuring
//////

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147']

// Goes by order
const [ , city, state = 'New York'] = address

console.log(`You are in ${city}, ${state}`)

const item = ['Coffee(hot)', '2.00', '2.50', '2.75']

const [coffee, , medium ] = item

console.log(`A medium ${coffee} costs $${medium}`)