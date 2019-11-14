import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { dutchLocale } from "../../locales/numeral-locale";

// Not 100% sure how to use numeral.js
numeral.locale("nl-nl");

// It doesn't have access to expenses object here but it does inside ExpenseList
// The props are already 'inside' of this component as well
// Whenever you use connect to connect a component to the Redux store, it'll inject dispatch as a prop to the component
const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  return (
    <Link className="list-item" to={`edit/${id}`}>
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__subtitle">{moment(createdAt).format("MMMM Do, YYYY")}</span>
      </div>
      <h3 className="list-item__amount">{numeral(amount / 100).format("$0,0.00")}</h3>
    </Link>
  );
};

// No need for mapStateToProps if you don't need state

export default ExpenseListItem;
