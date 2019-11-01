import React from 'react'
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'

numeral.locale('nl-nl')

class ExpensesSummary extends React.Component {
    state = {
        expenseCount: getVisibleExpenses(this.props.expenses, this.props.filters).length,
        expensesTotal: getExpensesTotal(getVisibleExpenses(this.props.expenses, this.props.filters))
    }
    render() {
        return (
            <div>
                {this.state.expenseCount > 0 && 
                    <p>Viewing {this.state.expenseCount} {this.state.expenseCount === 1 ? `expense` : `expenses`} totalling {numeral(this.state.expensesTotal / 100).format('$0,0.00')}</p>
                }                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpensesSummary)