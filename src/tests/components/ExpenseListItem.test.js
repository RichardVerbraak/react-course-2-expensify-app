import React from 'react'
import { Link } from 'react-router-dom'
import ExpenseListItem from '../../components/ExpenseListItem'
import expenses from '../fixtures/expenses'
import { shallow } from 'enzyme'

// We have to spread out expenses because we are destructuring them in ExpenseListItem
// It's the same as writing description={expenses[0].description} amount={expenses[0].amount} etc.
// A shorthand way of spreading all the properties on an object to props without having to manually type out every single one.
test('Should render first expense from fixture data', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>)
    expect(wrapper).toMatchSnapshot()
})