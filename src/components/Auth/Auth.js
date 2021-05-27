import { useState } from 'react'
import './auth.css';
import Login from './Login/Login';
import Register from './Register/Register';
import { Redirect, Router, Route } from "react-router-dom";
import Boards from '../Boards/Boards';

const Auth = () => {

    const onClickTabItem = () => {
        setShowLogin(!showLogin)
    }

    const [showLogin, setShowLogin] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (sessionStorage.getItem('jwtToken')) {
            setRedirect(true)
        }
    }

    return (
        <div className="main_container">
            <div className="align_form">
                <div className="form" onSubmit={onSubmit}>
                    <ul className="tab-group" onChange={onClickTabItem}>
                        <li className={!showLogin ? "tab active" : "tab"} onClick={onClickTabItem}><a href="#signup">Sign Up</a></li>
                        <li className={showLogin ? "tab active" : "tab"} onClick={onClickTabItem}><a href="#login">Log In</a></li>
                    </ul>

                    <div>
                        {
                            showLogin ? (
                                <Login />) : (
                                <Register />)
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth
