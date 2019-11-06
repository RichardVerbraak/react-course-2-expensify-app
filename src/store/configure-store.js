import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import  expensesReducer  from '../reducers/expenses'
import  filtersReducer  from '../reducers/filters'
import thunk from 'redux-thunk'

// If we are using redux dev tools its going to get setup, if not then it won't
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}
