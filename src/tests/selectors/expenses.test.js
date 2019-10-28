import moment from 'moment'
import getVisibleExpenses from '../../selectors/expenses'
import { get } from 'https'

// valueOf converts them to milliseconds again
const expenses = [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]

test('Should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[1]])
})

// Jan 1 and Jan 4 don't get filtered out because the startDate (Jan 1) is the same and before Jan 4th (startDate same or before createdAt)
test('Should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0]])
})

// Jan 2 is after Jan 1st 1970 and December 28th 1969 (endDate same or after createdAt)
test('Should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[1]])
})

// Shows most recent
test('Should filter by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',        
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

// Shows highest amount first
test('Should filter by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})