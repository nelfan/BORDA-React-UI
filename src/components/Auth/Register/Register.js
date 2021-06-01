import {useState} from 'react'
import '../auth.css';

const Register = ({onSubmitAuth}) => {
    const [userName, setUserName] = useState('')
    const [userNameDirty, setUserNameDirty] = useState(false)
    const [userNameError, setUserNameError] = useState('username cannot be empty')

    const [firstName, setFirstName] = useState('')
    const [firstNameDirty, setFirstNameDirty] = useState(false)
    const [firstNameError, setFirstNameError] = useState('First name cannot be empty')

    const [lastName, setLastName] = useState('')
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [lastNameError, setLastNameError] = useState('Last name cannot be empty')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onRegister = (e) => {
        e.preventDefault()
        if (!userName) {
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

        const data = registerUser(userName, firstName, lastName, email, password)

        sessionStorage.setItem('jwtToken', data.token)

        onSubmitAuth(data.token)

        return data
    }

    // Register user
    const registerUser = async (userName, firstName, lastName, email, password) => {
        const regData = {
            'username': userName,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        }

        const res = await fetch('http://localhost:9090/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(regData)
        })
        const data = await res.json()

        return data
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'userName':
                setUserNameDirty(true)
                break
            case 'firstName':
                setFirstNameDirty(true)
                break
            case 'lastName':
                setLastNameDirty(true)
                break
        }
    }

    const userNameHandler = (e) => {
        setUserName(e.target.value)
        const re = /^(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])$/;
        if (e.target.value.length < 3) {
            setUserNameError('Username cannot be less than 3 characters ')
        } else if (e.target.value.length > 15) {
            setUserNameError('Username cannot be more than 15 characters ')
        } else if (!re.test(String(e.target.value))) {
            setUserNameError('Username can only contain letters, numbers and "_" ')
        } else {
            setUserNameError('')
        }
    }

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
        const re = /^([A-Z]).([a-z])+$/;
        if (e.target.value.length < 2) {
            setFirstNameError('First name cannot be less than 2 characters ')
        } else if (e.target.value.length > 15) {
            setFirstNameError('First name cannot be more than 15 characters ')
        } else if (!re.test(String(e.target.value))) {
            setFirstNameError('First name can only contain letters and should start with Upper case')
        } else {
            setFirstNameError('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        const re = /^([A-Z]).([a-z])+$/;
        if (e.target.value.length < 2) {
            setLastNameError('Last name cannot be less than 2 characters ')
        } else if (e.target.value.length > 15) {
            setLastNameError('Last name cannot be more than 15 characters ')
        } else if (!re.test(String(e.target.value))) {
            setLastNameError('Last name can only contain letters and should start with Upper case')
        } else {
            setLastNameError('')
        }
    }

    return (
        <div id="signup" className="signUpContent">
            <h1>Sign Up for Free</h1>
            <form id="SignUpForm" onSubmit={onRegister}>
                <div className="input_fields">
                    <label htmlFor="username">Username</label>
                    {(userNameDirty && userNameError) && <div style={{color: 'red'}}>{userNameError}</div>}
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        name="userName"
                        placeholder="Enter username.."
                        value={userName}
                        onBlur={e => {
                            blurHandler(e)
                        }}
                        onChange={e => userNameHandler(e)}/>

                    <label htmlFor="firstName">First Name</label>
                    {(firstNameDirty && firstNameError) && <div style={{color: 'red'}}>{firstNameError}</div>}
                    <input
                        type="text"
                        id="firstName"
                        utocomplete="off"
                        name="firstName"
                        placeholder="Enter first name.."
                        value={firstName}
                        onBlur={e => {
                            blurHandler(e)
                        }}
                        onChange={e => firstNameHandler(e)}/>

                    <label htmlFor="lastName">Last Name</label>
                    {(lastNameDirty && lastNameError) && <div style={{color: 'red'}}>{lastNameError}</div>}
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="off"
                        placeholder="Enter last name.."
                        value={lastName}
                        onBlur={e => {
                            blurHandler(e)
                        }}
                        onChange={e => lastNameHandler(e)}/>

                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter email.."
                        onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">Password</label>
                    <div className="eye_pswd">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password.."
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="signUp_btn">
                        <input className="submit_signUp" type="submit" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register