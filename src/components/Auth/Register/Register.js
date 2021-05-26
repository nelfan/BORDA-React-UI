import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onRegister = (e) => {
        e.preventDefault()

        if (!username) {
            alert('Please add a username')
            return
        }

        if (!password) {
            alert('Please add a password')
            return
        }

        const data = registerUser(username, password)

        setUsername('')
        setPassword('')

        return data
    }

    // Register user
    const registerUser = async (username, password) => {
        const res = await fetch('http://localhost:9090/register', {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(username, password)
            })
        const data = await res.json()

        return data
    }

    return (
        <div id="login" class="signInContent">
            <h1>Welcome Back!</h1>
            <form id="SignInForm" onSubmit={onLogin}>
                <div class="enter_fields">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="usernamelog"
                        name="username"
                        autocomplete="off"
                        placeholder="Enter username.."
                        onChange={(e) => setUsername(e.target.value)} />

                    <label for="pass">Password</label>
                    <div class="enter_eye_pswd">
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            placeholder="Enter password.."
                            autocomplete="off"
                            onChange={(e) => setPassword(e.target.value)} />
                        <i class="far fa-eye" onclick="checkPass(this)" id="toggleLoginPassword"></i>
                    </div>
                    <div class="signIn_btn">
                        <input class="submit_signIn" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
