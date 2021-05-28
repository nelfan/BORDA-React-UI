import { Component } from 'react'
import './auth.css';
import Login from './Login/Login';
import Register from './Register/Register';
import { Redirect } from "react-router-dom";

class Auth extends Component {

    onClickTabItem = () => {
        this.showLogin = !this.showLogin
    }

    state = {
        showLogin: false,
        redirect: false
    }

    onSubmit = (token) => {
        if (token) {
            this.setState({ redirect: true })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/boards" />
        }
        return (
            <div className="main_container" >
                <div className="align_form">
                    <div className="form">
                        <ul className="tab-group">
                            <li className={!this.showLogin ? "tab active" : "tab"} onClick={this.onClickTabItem}><a href="#signup">Sign Up</a></li>
                            <li className={this.showLogin ? "tab active" : "tab"} onClick={this.onClickTabItem}><a href="#login">Log In</a></li>
                        </ul>

                        <div>
                            {
                                this.showLogin ? (
                                    <Login onSubmitAuth={this.onSubmit} />) : (
                                    <Register onSubmitAuth={this.onSubmit} />)
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Auth
