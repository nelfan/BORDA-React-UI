import {useState} from 'react'
import '../auth.css'
import Swal from "sweetalert2";

const Login = ({onSubmitAuth}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordEye, setStatusOnPassEye] = useState(false)

    const onLogin = (e) => {
        e.preventDefault()

        if (!username) {
            alert('Please add a username')
            return
        }

        if (!password) {
            alert('Please add a password')
            return
        }

        const data = loginUser(username, password)

        return data
    }

    // Login user
    const loginUser = async (username, password) => {
        const authData = {
            'username': username,
            'password': password
        }

        const res = await fetch('http://localhost:9090/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        })
        const check = await res

        if (check.status === 401) {
            Swal.fire({
                title: 'Error!',
                text: 'Username or Password is invalid',
                icon: 'error',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#386DD8'
            })
        }

        const data = await check.json()

        sessionStorage.setItem('jwtToken', data.token)

        onSubmitAuth(data.token)

        return data

    }

    const passwordToggle = (e) => {
        let inputField = e.currentTarget.parentNode.querySelector('#pass')
        inputField.type === "password" ? inputField.type = "text" : inputField.type = "password";
        setStatusOnPassEye(!passwordEye);
    }

    return (
        <div id="login" className="signInContent">
            <h1>Welcome Back!</h1>
            <form id="SignInForm" onSubmit={onLogin}>
                <div className="enter_fields">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="usernamelog"
                        name="username"
                        autoComplete="off"
                        placeholder="Enter username.."
                        onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="pass">Password</label>
                    <div className="enter_eye_pswd">
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            placeholder="Enter password.."
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)} required/>
                        {passwordEye ? <i className="fa fa-eye-slash" onClick={passwordToggle}
                                          style={{display: "flex", alignItems: "center", cursor: "pointer"}}
                                          id="togglePassword"/> : <i className="fa fa-eye" onClick={passwordToggle}
                                                                     style={{
                                                                         display: "flex",
                                                                         alignItems: "center",
                                                                         cursor: "pointer"
                                                                     }} id="togglePassword"/>}
                    </div>
                    <div className="signIn_btn">
                        <input className="submit_signIn" type="submit" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login