import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        const data = await res.json()

        return data
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
                        onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="pass">Password</label>
                    <div className="enter_eye_pswd">
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            placeholder="Enter password.."
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="signIn_btn">
                        <input className="submit_signIn" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
