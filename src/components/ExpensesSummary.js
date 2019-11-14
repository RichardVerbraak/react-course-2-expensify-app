import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import dutchLocale from '../../locales/numeral-locale'

numeral.locale('nl-nl')

//# Note: I refactored this because the summary wouldn't update when I used state the previous time
// This isn't the most clean code but it works
// TODO: BREAK UP THE LONG LINE OF CODE BELOW

// Change the inline variables (variables defined in render) to be outside
// Maybe use numeral beforehand instead of doing this inside of render
export class ExpensesSummary extends React.Component {    
    visibleExpenses = () => {
        return this.props.expenses.length
    }
    expensesSum = () => {
        return getExpensesTotal(this.props.expenses)
    }
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {this.visibleExpenses() > 0 && 
                        <h1 className="page-header__title">
                        Viewing <span>{this.visibleExpenses()}</span> {this.visibleExpenses() === 1 ? `expense` : `expenses`} totalling <span>{numeral(this.expensesSum() / 100).format('$0,0.00')}</span></h1>
                    }
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)

// {this.state.expenseCount === 1 ? `expense` : `expenses`}
// {numeral(this.state.expensesTotal / 100).format('$0,0.00')}

