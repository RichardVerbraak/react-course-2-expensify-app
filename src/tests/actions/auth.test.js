import { login, logout } from '../../actions/auth'

// Tests what gets returned from calling the actions

test('Should setup login action correctly', () => {
    const action = login('abc123')

    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'abc123'
    })
})

test('Should setup logout action correctly', () => {
    const action = logout()

    expect(action).toEqual({
        type: 'LOGOUT'
    })
})