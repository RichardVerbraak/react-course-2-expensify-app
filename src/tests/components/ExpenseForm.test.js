import React from 'react'
import {shallow} from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('Should render ExpenseForm correctly with no expense data', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>)
    expect(wrapper).toMatchSnapshot()
})

// Finds the form and simulates a submit
// Because we don't have an event like we would have normally nothing gets passed to the (e) event
// Because nothing gets passed in we get undefined, which in turn stops preventDefault from running
// To prevent this we fake an (e) object and run preventDefault on it (remember that the (e) event is an object that has methods like preventDefault on it, something something prototypes etc.)
// So now we make an empty object and run the preventDefault function on/in it
test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

test('Should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value: 'New Description' }
    })
    expect(wrapper.state('description')).toBe('New Description')
})

// The second arg to simulate is the fake event object
test('Should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('textarea').simulate('change', {
        persist: () => {},
        target: {
            value: 'New Note'
        }
    })
    expect(wrapper.state('note')).toBe('New Note')
})

// Valid amount
// Pass in string not a number because amount.match (the regex) works off strings not numbers 
test('Should set amount on input change', () => {
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: '23.50'
        }
    })
    expect(wrapper.state('amount')).toBe('23.50')
})

// Invalid amount
test('Should NOT set amount on input change', () => {
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: '12.222'
        }
    })
    expect(wrapper.state('amount')).toBe('')
})

// Spies are used to check if functions run properly
test('Should call onSubmit prop for valid form submission', () => {
    const onSumbitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSumbitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSumbitSpy).toHaveBeenLastCalledWith({
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    })
})

// react-dates changed there rendering of SDP --> withStyles wraps around SingleDatePicker (HOC) also shows in the snapshot
test('Should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('Should set calender focus on change to true', () => {
    const wrapper = shallow(<ExpenseForm/>)
    const focused = true
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toBe(true)
})