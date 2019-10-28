import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let addExpense, history, wrapper

// We fake these 2 functions with jest.fn just like we faked the event object (sorta)
// Before each function runs, set the variables equal to these things
beforeEach(() => {    
    addExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>)
})

test('Should render AddExpensePage', () => {    
    expect(wrapper).toMatchSnapshot()
})

test('Should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})