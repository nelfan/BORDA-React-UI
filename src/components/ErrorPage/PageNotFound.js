import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import "./pageNotFound.css"
import Header from '../Header/Header';
import HeaderLogo from "../Header/HeaderLogo/HeaderLogo";

const PageNotFound = () => {
    let location = useLocation()
    const isTokenExist = sessionStorage.getItem('jwtToken')

    return (
        <>
            {(isTokenExist) && <Header/>}
            {(isTokenExist) &&
            <div className="main-info">
                <h1>404 - Not Found!</h1>
                <h2>No match for <u>{location.pathname}</u></h2>
            </div>
            }
            {(isTokenExist) &&
            <div className="links">
                <Link to="/boards">
                    <h2>Go to my boards</h2>
                </Link>
            </div>
            }
            {(!isTokenExist) &&
            <div className="header-empty">
                <HeaderLogo/>
            </div>
            }
            {(!isTokenExist) &&
            <div className="main-info">
                <h1>401 - Unauthorized!</h1>
                <h2>Please sign in to use <u>{location.pathname}</u></h2>
            </div>
            }
            {(!isTokenExist) && <div className="links">
                <Link to="/auth">
                    <h2>Sign in</h2>
                </Link>
            </div>
            }
        </>
    )
}

export default PageNotFound;