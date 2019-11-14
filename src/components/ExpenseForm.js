import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

// onChange has an argument called e like eventhandlers
// e.persist() lets you access e.target.value in the callback for setState
// If you dont use this or store the target.value, you'll get an error because you're using it in the setState callback, which doesn't run right away
// Regex reads like: start with a digit - ranging from 1 to infinity (was no numbers at all before with an *) - it can be followed by a dot and 2 digits
// A form that can be used to add or edit expense (reusable code)
// Have to use constructor with super to get access to the props for state OR just use this.props thanks to the class transform lib
// Can override state with spread operator, but we need to validate first
export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => {
      return {
        description: description
      };
    });
  };
  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => {
        return {
          amount: amount
        };
      });
    }
  };
  onNoteChange = e => {
    e.persist();
    this.setState(() => {
      return {
        note: e.target.value
      };
    });
  };
  // Gets the date passed in from state - If there is a createdAt value then setState (prevents user from clearing the date)
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => {
        return {
          createdAt: createdAt
        };
      });
    }
  };
  // Gets the state calenderFocused boolean
  onFocusChange = ({ focused }) => {
    this.setState(() => {
      return {
        calendarFocused: focused
      };
    });
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => {
        return {
          error: "Please provide description and amount."
        };
      });
    } else {
      this.setState(() => {
        return {
          error: ""
        };
      });
      // This comes 'down' from the addExpensePage via props - onSubmit we pass this object back 'up'
      this.props.onSubmit({
        description: this.state.description,
        note: this.state.note,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };
  // You need the && otherwise it renders an empty <p> tag for error
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          className="text-input"
          placeholder="Description"
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.noteText}
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
