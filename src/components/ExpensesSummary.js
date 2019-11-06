import React from 'react'
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import dutchLocale from '../../locales/numeral-locale'

numeral.locale('nl-nl')

export class ExpensesSummary extends React.Component {
    state = {
        expenseCount: getVisibleExpenses(this.props.expenses, this.props.filters).length,
        expensesTotal: getExpensesTotal(getVisibleExpenses(this.props.expenses, this.props.filters))
    }
    render() {
        return (
            <div>
                {this.state.expenseCount > 0 && 
                    <h1>Viewing {this.state.expenseCount} {this.state.expenseCount === 1 ? `expense` : `expenses`} totalling {numeral(this.state.expensesTotal / 100).format('$0,0.00')}</h1>
                }                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpensesSummary)