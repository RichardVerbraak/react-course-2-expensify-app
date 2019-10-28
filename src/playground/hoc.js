// High Order Component (HOC) -- A component (HOC) that renders another component
// Reusable code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>The info is: {props.info}</p>
        </div>
    )
}

// HOC -- Every page can now use this warning message
// We spread props out so child components can use those props

// const withAdminWarning = (WrappedComponent) => {
//     return (props) => (
//         <div>
//             {!props.isAdmin && <p>Don't share private info, please.</p>}
//             <WrappedComponent {...props}></WrappedComponent>
//         </div>
//     )
// }


const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}></WrappedComponent> : <p>Please login to view info</p>}            
        </div>
    )
}

// const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)



ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"></AuthInfo>, document.getElementById('app'))