import expensesReducer from "../../reducers/expenses"
import moment from 'moment'

const expenses = [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]

// @@INIT is what initializes default values
test('Should default to an empty array at first', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

// State should now only have 2 expenses
test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('Should add an expense to the array', () => {
    const state = expensesReducer(expenses, {type: 'ADD_EXPENSE', expense: { description: '10 Pizzas' }})
    expect(state).toEqual([...expenses, { description: '10 Pizzas' }])
})

test('Should let you edit an expense', () => {
    const state = expensesReducer(expenses, {type: 'EDIT_EXPENSE', id: '1', updates: { description: 'Totally not Gum' }})
    expect(state[0].description).toBe('Totally not Gum')
})

// Actions could also be setup like this for clarity
test('Should not edit expense, if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE', 
        id: '-1', 
        updates: { 
            description: 'Totally not Gum'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})


