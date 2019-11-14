import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

// onSubmit gets passed down to ExpenseForm
// which is were we actually add an expense
export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>

        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit}></ExpenseForm>
        </div>
      </div>
    );
  }
}

// Functions that only render JSX is much handier than classes (more notes on this)
// But defining a new function inside of it like the onSubmit(dispatch) 'in-line' of this JSX function is bad
// It has to re-create the function every time this component rerenders, it's not that much of a performance issue but better to avoid it
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 props.onSubmit(addExpense(expense))
//                 props.history.push('/')
//             }}
//         ></ExpenseForm>
//     </div>
// )

// Abstract away with dispatch (we basically rename dispatch to addExpense) which is now more accesible via props, for writing tests
const mapDispatchToProps = dispatch => {
  return {
    startAddExpense: expense => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
