import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from './../components/Header'

// We destructure/use the authenticated and component prop for privateRoute and use rest of the props (path and exact) to use in our actual route
// In English: we only use 2 of the props for PrivateRoute and the rest gets passed down to our new Route (so without the authenticated and component props
export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => {
    return (        
        <Route {...rest} component={(props) => {            
            return (
                isAuthenticated ? 
                <div>
                    <Header/>
                    <Component {...props} />
                </div> 
                : <Redirect to="/" />
            )            
        }}/>
    )
}

// Grab something from the state & connect/use it to our component
// !! to flip the values to actual booleans, if we were unauthenticated we wouldve gotten undefined, if authenticated we'd get the user string
const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }    
}

export default connect(mapStateToProps)(PrivateRoute)