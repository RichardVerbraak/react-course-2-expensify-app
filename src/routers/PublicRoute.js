import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// If logged in, dont let user get redirected to the login page when going to the dashboard
export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => {
    return (        
        <Route {...rest} component={(props) => {            
            return (
                isAuthenticated ? 
                    <Redirect to="/dashboard" />               
                : 
                    <Component {...props} />
            )            
        }}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }    
}

export default connect(mapStateToProps)(PublicRoute)

//# Note that you could set the NavLink in header to="dashboard" instead of "/" would work because of our condition inside onAuthStateChange
// The condition when logged in:
//  if (history.location.pathname === '/') {
    //     history.push('/dashboard')
    // }

// This is only a convenient side effect because we render the entire app based on the user being logged in/logged out