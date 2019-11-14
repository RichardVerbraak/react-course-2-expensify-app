import React from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
// import 'react-dates/lib/css/_datepicker.css' was causing issue with jest {.DateRangePicker} so commented out, but everything still works ??????
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";

// We set the value of the input field to whatever is in the filters array first
// onChange of the input value --> set the text filter to input val
// Controlled Input -- A value that is controlled by JS(React) React has the source of truth for these values instead of DOM now
export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  // When calendar gets clicked on it passes those dates to the store
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = calendarFocused => {
    this.setState(() => {
      return {
        calendarFocused: calendarFocused
      };
    });
  };
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = e => {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              placeholder="Search expenses"
              className="text-input"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDateId="MyDatePickerStart"
              endDateId="MyDatePickerEnd"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTextFilter: text => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate))
  };
};

const ConnectedExpenseListFilters = connect(state => {
  return {
    filters: state.filters
  };
}, mapDispatchToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;