import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

// The action generator for removeExpense expects an object
// this.props on class components
export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>

        <div className="content-container">
          <ExpenseForm
            expense={this.expense}
            onSubmit={this.onSubmit}
          ></ExpenseForm>
          <button className="button button--secondary" onClick={this.onClick}>
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

// Give EditExpensePage access to the expenses array
// Give the page only the expense that matches the id in the url parameter and it's id comes from the :id from the router thing
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};

// 'builts in' dispatch inside of the edit and remove expense funcs
// It basically makes a new function that uses dispatch
// Props can get used here but we dont need it, these would be the props getting passed into the connected component
const mapDispatchToProps = (dispatch, props) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
