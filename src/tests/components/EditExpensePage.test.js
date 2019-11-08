import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { EditExpensePage } from '../../components/EditExpensePage'

let editExpense, startRemoveExpense, history, wrapper

// history (an object) has a method called push on it, which we are going to mock
// We are going to spy on these functions to see if they are called with the correct data
// We pass in a expense prop to simulate the actual component (I used the expenses fixture without the expense prop which isnt the 'real' simulation)
beforeEach(() => {
    editExpense = jest.fn()
    startRemoveExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<EditExpensePage history={history} editExpense={editExpense} startRemoveExpense={startRemoveExpense} expense={expenses[0]}/>)
})

test('Should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id ,expenses[0])
})

// or wrapper.find.('button').simulate('click')
test('Should handle removeExpense', () => {
  wrapper.find('button').prop('onClick')()
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id})
})