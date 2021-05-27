import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './auth.css';
import Login from './Login/Login';
import Register from './Register/Register';

const Auth = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()


    }

    return (
        <div class="main_container">
            <div class="align_form">
                <div class="form" onSubmit={onSubmit}>
                    <ul class="tab-group">
                        <li class="tab active"><a href="#signup">Sign Up</a></li>
                        <li class="tab"><a href="#login">Log In</a></li>
                    </ul>

                    <div class="tab-content">
                            <>
                                {
                                    showLogin ? (
                                        <Login />) : (
                                        <Register />)
                                }
                            </>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth
