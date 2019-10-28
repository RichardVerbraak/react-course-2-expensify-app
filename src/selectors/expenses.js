import moment from 'moment'

// Gets the filtered and sorted expenses
// Also sorts by the oldest created expense first or highest amount (?)
// Filters startDates out, based on if they are made on the same day or before the createdAt
// Expenses array gets filtered on the booleans coming from the ternary operator comparisons
// If there is no startDate we won't filter based of off that so we just use true (so it doesnt get filtered out or w/e)
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        // Is 1000 < 0 ? if not : put that one first (most recent)
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })    
}

export default getVisibleExpenses