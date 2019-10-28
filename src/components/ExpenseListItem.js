import React from 'react'
import { Link } from 'react-router-dom'

// It doesn't have access to expenses object here but it does inside ExpenseList
// The props are already 'inside' of this component as well
// Whenever you use connect to connect a component to the Redux store, it'll inject dispatch as a prop to the component
const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    return (
        <div>
            <Link to={`edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>        
        </div>
    )
}

// No need for mapStateToProps if you don't need state

export default ExpenseListItem