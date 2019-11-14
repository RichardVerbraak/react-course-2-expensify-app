import React from 'react'
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import dutchLocale from '../../locales/numeral-locale'

numeral.locale('nl-nl')

//# Note: I refactored this because the summary wouldn't update when I used state the previous time
// This isn't the most clean code but it works

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
            <div>
                {this.visibleExpenses() > 0 && 
                    <h1>Viewing {this.visibleExpenses()} {this.visibleExpenses() === 1 ? `expense` : `expenses`} totalling {numeral(this.expensesSum() / 100).format('$0,0.00')}</h1>
                }
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

