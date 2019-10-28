const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        // Gets state and returns new arr with the old + the new expense
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        // Makes a new array except for the ones that didn't pass the test (so it excludes the one that did match)
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => {
                return expense.id !== action.id
            })
        // Map -> creates new arr with the results of the below expression that is done on every element
        // Overrides the old expense array with updated expense
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

export default expensesReducer