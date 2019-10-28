import { createStore } from 'redux'

// Action generator - functions that return action objects

const add = ({ a, b }, c) => {
    return a + b + c
}

console.log(add({a: 1, b: 12}, 100))

// We set it to a default obj because otherwise you'll get an error if incrementBy doesnt get passed in
const incrementCount = ({ incrementBy = 1 } = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
}

const decrementCount = ({ decrementBy = 1 } = {}) => {
    return {
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
}

const resetCount = () => {
    return {
        type: 'RESET'
    }
}

const setCount = ({ count = 10} = {}) => {
    return {
        type: 'SET',
        count: count
    }
}

// Reducers
// 1. Reducers are pure functions -- Functions that dont interact with things outside of it's scope
// 2. Never change state or action directly, only return an object with the new state

// Setting state to an object like below is the default state
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state
    }       
}


const store = createStore(countReducer)

// The return value of subscribe is a function that stops the updating
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// Actions - is an object that gets sent to the store

// Increment Count
store.dispatch(incrementCount({ incrementBy: 5 }))

// Reset Count
store.dispatch(resetCount())

// Decrement Count
store.dispatch(decrementCount({ decrementBy: 20 }))

// Set count
store.dispatch(setCount({ count: 100 }))

