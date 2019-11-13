import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
})

test('Should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters with altFilter data', () => {
    wrapper.setProps({filters: altFilters})
    expect(wrapper).toMatchSnapshot()
})

// !
test('Should change the text with set text', () => {
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value: altFilters.text
        }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text)
})

test('Should sort by date', () => {
    wrapper.find('select').simulate('change', {
        target: {
            value: 'date'
        }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('Should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {
            value: 'amount'
        }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

// Use simulate for DOM events and prop otherwise (either works though)
// withStyles had to be added to fix the stupid error about props method on 0 nodes or something
test('Should set startDate and endDate', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate: altFilters.startDate, endDate: altFilters.endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate)
})

// calendarFocused should either be null, startDate or endDate for the inputFocused prop to work (react-dates docs)
// It doesn't care about true or false or an actual moment(), only that it's one of the above
// Because this date picker doesn't have a true or false (open or not, this one is open on either the startDate or endDate part)
test('Should set calenderFocused to be on endDate', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate')
    expect(wrapper.state('calendarFocused')).toBe('endDate')
})

