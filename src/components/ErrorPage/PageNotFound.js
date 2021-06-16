import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import "./pageNotFound.css"
import Header from '../Header/Header';

const PageNotFound = () => {
    let location = useLocation()
    const isTokenExist = sessionStorage.getItem('jwtToken')

    return (
        <>
            <div>
                {(isTokenExist) && <Header></Header>}
            </div>
            {(!isTokenExist) && <div className="links">
                <Link to="/auth">
                    <h2>Sign in</h2>
                </Link>
            </div>
            }
            <div className="main-info">
                <h1>404 - Not Found!</h1>
                <h2>No match for <u>{location.pathname}</u></h2>
            </div>
        </>
    )
}

export default PageNotFound;