import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

// toBe doesn't work because {} === {} is always false, same with an array
// toEqual compares the objects key/value pairs with each other
test('Should setup remove expense action', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('Should setup edit expense action', () => {
    const action = editExpense('123abc', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    })
})

test('Should setup add expense action', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]     
    })
})

// Jest needs to be told if the given test is an asynchronous one
// It just goes through all of the function below, if there isn't an error it will pass the test
// It won't wait on the asynchronous startAddExpense unless you told it to wait by passing/putting in done() at the end of the async function
test('Should add expense to database and redux store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Gas bill',
        note: 'This is a note',
        amount: 50,
        createdAt: 1000
    }

    // It will save to firebase first before storing in Redux
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // Is an array of all the actions that were dispatched
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        // expense.id is the same as looking it up by firebases key value, firebase key was stored inside expense.id in the startAddExpense function
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        // If the returned promise above resolves then check the if the data matches       
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('Should add expense with default to database and redux store', (done) => {
    const store = createMockStore({})
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    
    // Check if action was dispatched to redux store
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        })

        // Check if stored in firebase
        return firebase.ref(`expenses/${actions[0].expense.id}`).once('value')
                
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults)
        done()   
    })         
})

// This one is no longer responsible since the firebase implementation, it is now the startAddExpense action
// test('Should setup add expense action with default values', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })


// export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => {
//     return {
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: uuid(),
//             description: description,
//             note: note,
//             amount: amount,
//             createdAt: createdAt
//         }
//     }
// }