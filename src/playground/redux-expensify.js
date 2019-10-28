import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'


// Action Generators -- WHAT to change state with
// ADD_EXPENSE
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: description,
            note: note,
            amount: amount,
            createdAt: createdAt
        }
    }
}

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id: id
    }
}

// EDIT_EXPENSE
const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
}

// SET_TEXT_FILTER -- Default is empty string
const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT',
        text: text
    }
}

// SORT_BY_DATE
const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}

// SORT_BY_AMOUNT
const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'        
    }
}

// SET_START_DATE
const setStartDate = (date) => {
    return {
        type: 'SET_START_DATE',
        startDate: date
    }
}

// SET_END_DATE
const setEndDate = (date) => {
    return {
        type: 'SET_END_DATE',
        endDate: date
    }
}

// Expenses Reducer 

const expensesReducerDefaultState = []

// The reducer function -> HOW to change state
// You return an object to change state (like this.setState) as to not change state directly
// ...state means take the state array and add on the expense (it doesnt change state directly, it's like .concat)
// Edit expense gets the matched expense object and then overrides it with the updates
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => {
                return expense.id !== action.id
            })
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT': {
            return {
                ...state,
                text: action.text
            }
        }
        case 'SORT_BY_AMOUNT': {
            return {
                ...state,
                sortBy: 'amount'
            }
        }
        case 'SORT_BY_DATE': {
            return {
                ...state,
                sortBy: 'date'
            }
        }
        case 'SET_START_DATE': {
            return {
                ...state,
                startDate: action.startDate
            }
        }
        case 'SET_END_DATE': {
            return {
                ...state,
                endDate: action.endDate
            }
        }
        default:
            return state
    }
}

// timestamps (again)
// January 1st 1970 (unix epoch = 0 milliseconds)


// Get visible expenses
// Only shows an array that returns true for all 3 things
// If the dates are i.e undefined, it evaluates to true, so it can show all expenses anyway
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })    
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 150, createdAt: -21000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 1, createdAt: -1000 }))

// console.log(expenseOne)
// // We 'pluck' the id from one expense
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 } ))

// store.dispatch(setTextFilter('re'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// // store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))


const demoState = {
    expenses: [{
        id: 'jasdfhf',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // Date or amount
        startDate: undefined,
        endDate: undefined
    }
}

// const user = {
//     name: 'Jen',
//     age: 24
// }

// console.log({
//     ...user,
//     location: 'Philadelphia',
//     age: 35
// })