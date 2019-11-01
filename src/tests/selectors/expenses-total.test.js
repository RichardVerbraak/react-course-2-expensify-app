import getExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('Should return 0 if no expenses', () => {
    const result = getExpensesTotal([])
    expect(result).toBe(0)
})

// I screwed up at first by passing in the expense[0] object but it forEach can't iterate over objects let alone one object
test('Should add up 1 expense', () => {
    const result = getExpensesTotal([expenses[0]])
    console.log(expenses[0])
    console.log([expenses[0]])
    expect(result).toBe(195)
})

test('Should add up multiple expenses', () => {
    const result = getExpensesTotal(expenses)
    expect(result).toBe(114195)
})