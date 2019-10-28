import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

// toBe doesn't work because {} === {} is always false, same with an array
// toEqual compares the objects key/value pairs with each other
test('Should setup remove expense action', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('Should setup edit expense action', () => {
    const action = editExpense('123abc', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    })
})

test('Should setup add expense action', () => {
    const action = addExpense({description: 'Some description', note: 'Some note', amount: 5, createdAt: 100})
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: 'Some description',
            note: 'Some note',
            amount: 5,
            createdAt: 100
        }        
    })
})

test('Should setup add expense action with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})


// export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => {
//     return {
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: uuid(),
//             description: description,
//             note: note,
//             amount: amount,
//             createdAt: createdAt
//         }
//     }
// }