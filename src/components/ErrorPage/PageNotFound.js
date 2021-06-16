import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import "./pageNotFound.css"

const PageNotFound = () => {
    let location = useLocation()
    const isTokenExist = sessionStorage.getItem('jwtToken')

    return (
        <>
            <div className="links">
                {(isTokenExist) && <Link to="/boards">
                    <h2>Go to My boards</h2>
                </Link>}
                {(!isTokenExist) && <Link to="/">
                    <h2>Go to Login</h2>
                </Link>}
            </div>
            <div className="main-info">
                <h1>404 - Not Found!</h1>
                <h2>No match for <u>{location.pathname}</u></h2>
            </div>
        </>
    )
}

export default PageNotFound;