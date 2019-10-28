import moment from 'moment'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters'

test('Should setup the action to set text to a default empty string', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: ''
    })
})

test('Should setup the action to change text to 123abc', () => {
    const action = setTextFilter('123abc')
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: '123abc'
    })
})

test('Should setup the action for sorting by date', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('Should setup the action for sorting by anount', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('Should setup the action for setting the start date', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('Should setup the action for setting the start date', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})