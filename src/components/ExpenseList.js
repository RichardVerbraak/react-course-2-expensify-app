import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses'

// !!! When you connect a component to the redux store it's reactive (as the store changes it will rerender itself with those new values)
// Props now has access to whatever came back from store
// ...expense just shows all of the expense key/value pairs instead of manually typing them all out
export const ExpenseList = (props) => {
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>No Expenses</p>
                ) : (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense}/>
                    })
                )
            }
        </div>
    )
}

// The API for connect looks weird
// The first arg to connect is a function that lets you choose what you want from the store and gives access to state
// The return value can now be accessed via props
const ConnectedExpenseList = connect((state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
})(ExpenseList)

export default ConnectedExpenseList


// THE COMMON WAY (?)

// const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList)

// const mapStateToProps = (state) => {
//     return {
//         expenses: state.expenses
//     }
// }