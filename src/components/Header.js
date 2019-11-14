import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

// NavLink is just a hyperlink to another page
export const Header = (props) => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">         
            <Link className="header__title" to="/dashboard">
                <h1>Expensify</h1>
            </Link>
            <button className="button button--link" onClick={props.startLogout}>Logout</button>
        </div>
    </div>   
    </header>
)

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
}

export default connect(undefined, mapDispatchToProps)(Header)