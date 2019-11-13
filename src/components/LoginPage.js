import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
 
export const LoginPage = (props) => {
    return (
        <div>
            <button onClick={props.startLogin}>Login</button>
        </div>
    )
}

// Give the props access to the dispatch function
const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: () => dispatch(startLogin())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage)