import authReducer from '../../reducers/auth'

// Default state by passing in undefined
test('Should store user id upon login action', () => {    
    const action = {
        type: 'LOGIN',
        uid: 'abc123'
    }
    const state = authReducer(undefined ,action)
    expect(state).toEqual({
        uid: 'abc123'
    })
})

test('Should clear user id upon logout', () => {    
    const currentState = {
        uid: 'abc123'
    }
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(currentState ,action)
    expect(state).toEqual({})
})

