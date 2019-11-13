// Upon login action which passes us the uid, store this in redux under the property - uid

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}

export default authReducer