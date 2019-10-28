import React from 'react'
import { shallow } from 'enzyme'
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage'

// Snapshot is not right (yet)
test('Should render dashboard page', () => {
    const wrapper = shallow(<ExpenseDashboardPage/>)
    expect(wrapper).toMatchSnapshot()
})