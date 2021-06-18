import React, {useState} from 'react'
import './auth.css';
import Login from './Login/Login';
import Register from './Register/Register';
import {Redirect} from "react-router-dom";

const Auth = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const onClickTabItem = () => {
        setShowLogin(!showLogin)
    }

    const getUser = async () => {
        const res = await fetch('http://localhost:9090/users/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    const onSubmit = (token) => {
        if (token) {
            setRedirect(true)
        }
        getUser();
    }

    if (redirect) {
        return <Redirect to="/boards"/>
    }
    return (
        <div className="main_container">
            <div className="align_form">
                <div className="form">
                    <ul className="tab-group">
                        <li className={!showLogin ? "tab active" : "tab"} onClick={onClickTabItem}><a>Sign
                            Up</a></li>
                        <li className={showLogin ? "tab active" : "tab"} onClick={onClickTabItem}><a>Log
                            In</a></li>
                    </ul>

                    <div>
                        {
                            showLogin ? (
                                <Login onSubmitAuth={onSubmit}/>) : (
                                <Register onSubmitAuth={onSubmit}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Auth
