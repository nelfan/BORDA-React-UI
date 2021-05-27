import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onRegister = (e) => {
        e.preventDefault()

        if (!username) {
            alert('Please add a username')
            return
        }

        if (!firstName) {
            alert('Please add a first name')
            return
        }

        if (!lastName) {
            alert('Please add a last name')
            return
        }

        if (!email) {
            alert('Please add an email')
            return
        }

        if (!password) {
            alert('Please add a password')
            return
        }

        const data = registerUser(username, firstName, lastName, email, password)

        return data
    }

    // Register user
    const registerUser = async (username, firstName, lastName, email, password) => {
        const regData = {
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        }

        const res = await fetch('http://localhost:9090/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(regData)
        })
        const data = await res.json()

        return data
    }

    return (
        <div id="signup" className="signUpContent">
            <h1>Sign Up for Free</h1>
            <form id="SignUpForm" onSubmit={onRegister}>
                <div className="input_fields">
                    <label htmlFor="username">Username</label>

                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        name="username"
                        placeholder="Enter username.."
                        onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        utocomplete="off"
                        name="firstName"
                        placeholder="Enter first name.." 
                        onChange={(e) => setFirstName(e.target.value)} />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="off"
                        placeholder="Enter last name.." 
                        onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter email.." 
                        onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <div className="eye_pswd">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password.."
                            autoComplete="off" 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="signUp_btn">
                        <input className="submit_signUp" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
