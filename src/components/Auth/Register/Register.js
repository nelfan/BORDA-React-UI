import {useState} from 'react'
import '../auth.css';

const Register = ({onSubmitAuth}) => {
    const [userName, setUserName] = useState('')
    const [userNameDirty, setUserNameDirty] = useState(false)
    const [userNameError, setUserNameError] = useState('username cannot be empty')

    const [firstName, setFirstName] = useState('')
    const [firstNameDirty, setFirstNameDirty] = useState(false)
    const [firstNameError, setFirstNameError] = useState('first name cannot be empty')

    const [lastName, setLastName] = useState('')
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [lastNameError, setLastNameError] = useState('last name cannot be empty')

    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState('email cannot be empty')

    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState('password cannot be empty')

    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [passwordConfirmationDirty, setPasswordConfirmationDirty] = useState(false)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('please confirm your password')

    const onRegister = (e) => {
        e.preventDefault()
        if (!userName) {
            alert('Please add a username')
            return
        } else if (userNameError !== '') {
            alert('Invalid username')
            return;
        }

        if (!firstName) {
            alert('Please add a first name')
            return
        } else if (firstNameError !== '') {
            alert('Invalid first name')
            return;
        }

        if (!lastName) {
            alert('Please add a last name')
            return
        } else if (lastNameError !== '') {
            alert('Invalid last name')
            return;
        }

        if (!email) {
            alert('Please add an email')
            return
        } else if (emailError !== '') {
            alert('Invalid email')
            return;
        }

        if (!password) {
            alert('Please add a password')
            return
        } else if (passwordError !== '') {
            alert('Invalid password')
            return;
        }

        if (!passwordConfirmation) {
            alert('Please confirm password')
            return
        } else if (passwordConfirmationError !== '') {
            alert('The entered passwords  do not match')
            return;
        }

        const data = registerUser(userName, firstName, lastName, email, password)

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

        sessionStorage.setItem('jwtToken', data.token)

        onSubmitAuth(data.token)

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
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'passwordConfirmation':
                setPasswordConfirmationDirty(true)
                break
            default:
                break
        }
    }

    const userNameHandler = (e) => {
        setUserName(e.target.value)
        const re = /^(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])$/;
        if (e.target.value.length < 3) {
            setUserNameError('Username cannot be less than 3 characters ')
        } else if (e.target.value.length > 30) {
            setUserNameError('Username cannot be more than 30 characters ')
        } else if (!re.test(String(e.target.value))) {
            setUserNameError('Username can only contain letters, numbers and "_" ')
        } else {
            setUserNameError('')
        }
    }

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
        const re = /^[A-Z][a-z]*([-][A-Z][a-z]*)?$/;
        if (e.target.value.length < 2) {
            setFirstNameError('First name cannot be less than 2 characters ')
        } else if (e.target.value.length > 30) {
            setFirstNameError('First name cannot be more than 30 characters ')
        } else if (!re.test(String(e.target.value))) {
            setFirstNameError('First name can only contain letters and should start with Upper case')
        } else {
            setFirstNameError('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        const re = /^[A-Z][a-z]*([-][A-Z][a-z]*)?$/;
        if (e.target.value.length < 2) {
            setLastNameError('Last name cannot be less than 2 characters ')
        } else if (e.target.value.length > 30) {
            setLastNameError('Last name cannot be more than 30 characters ')
        } else if (!re.test(String(e.target.value))) {
            setLastNameError('Last name can only contain letters and should start with Upper case')
        } else {
            setLastNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value))) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
        if (e.target.value.length < 6) {
            setPasswordError('password cannot be less than 6 characters ')
        } else if (e.target.value.length > 30) {
            setPasswordError('password cannot be more than 30 characters ')
        } else if (!re.test(String(e.target.value))) {
            setPasswordError('password should have at least one uppercase letter, one lowercase letter and one number')
        } else {
            setPasswordError('')
        }
    }

    const passwordConfirmationHandler = (e) => {
        setPasswordConfirmation(e.target.value)
        if (e.target.value !== password) {
            setPasswordConfirmationError('the entered passwords must match')
        } else {
            setPasswordConfirmationError('')
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
                    {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                    <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter email.."
                        value={email}
                        onBlur={e => {
                            blurHandler(e)
                        }}
                        onChange={e => emailHandler(e)}/>

                    <label htmlFor="password">Password</label>
                    {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                    <div className="eye_pswd">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password.."
                            autoComplete="off"
                            value={password}
                            onBlur={e => {
                                blurHandler(e)
                            }}
                            onChange={e => passwordHandler(e)}/>
                    </div>
                    <label htmlFor="password-confirm">Password confirmation</label>
                    {(passwordConfirmationError && passwordConfirmationDirty) && <div style={{color: 'red'}}>{passwordConfirmationError}</div>}
                    <div className="eye_pswd">
                        <input
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            placeholder="Confirm password.."
                            autoComplete="off"
                            value={passwordConfirmation}
                            onBlur={e => {
                                blurHandler(e)
                            }}
                            onChange={e => passwordConfirmationHandler(e)}/>
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