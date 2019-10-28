// SET_TEXT_FILTER -- Default is empty string
export const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT',
        text: text
    }
}

// SORT_BY_DATE
export const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}

// SORT_BY_AMOUNT
export const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'        
    }
}

// SET_START_DATE
export const setStartDate = (date) => {
    return {
        type: 'SET_START_DATE',
        startDate: date
    }
}

// SET_END_DATE
export const setEndDate = (date) => {
    return {
        type: 'SET_END_DATE',
        endDate: date
    }
}