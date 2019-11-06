import database from '../firebase/firebase'

// With firebase (is now asynchronous)
// component calls action generator
// action generator returns function
// component dispatches function (?)
// function runs internally by redux and then has the ability to dispatch other actions 

// ADD_EXPENSE
export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense: expense
    }
}

// HARDER THEN IT LOOKS
// This dispatches another dispatch call AFTER it's been stored in firebase upon resolve
// We get an expense passed from the component to this action
// If there isn't one we set it default to an empty object
// Then we start off by creating a function that has access to dispatch (now possible too thunk for creating functions inside of actions)
// If there is one with empty fields we set the expenseData to default values
// We setup to destructure things from the expense we got from the component, and store in firebase AND redux store
// We push on the expense and save it to firebase and THEN, if resolved (promise/asynchronous) we dispatch the action to change the redux store
// .then has access to the reference (because it's now stored in firebase) and we store the firebase id in the redux store as well as the rest
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // Default values if fields were left empty
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData

        const expense = { description, note, amount, createdAt }

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id: id
    }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
}