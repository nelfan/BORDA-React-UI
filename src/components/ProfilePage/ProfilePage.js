import './profilePage.css';
import default_user from '../../assets/images/default-user.jpg';
import Avatar from './Avatar/Avatar';
import React, {useRef, useState} from 'react';
import $ from 'jquery';
import * as regExpUtil from '../../utils/regExpUtil'

const ProfilePage = (props) => {
    const ref_image = React.createRef();
    const ref_email = useRef(null);
    const ref_firstName = useRef(null);
    const ref_lastName = useRef(null);
    const user = JSON.parse(sessionStorage.getItem('user'));

    const fieldHandling = (field, value) => {
        if (field != null)
            return (value.length === 0 || user[field] === value) ? null : value;
        else return value.length === 0 ? null : value;
    }

    const saveUser = async () => {

        console.log(user);
        const update_user = {
            'email': fieldHandling("email", email),
            'firstName': fieldHandling("firstName", fName),
            'lastName': fieldHandling("lastName", lName),
            'password': fieldHandling(null, password),
            'avatar': user.avatar,
        }

        const res = await fetch('http://localhost:9090/users/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(update_user),
        });

        const data = await res;
        if (await data.status===200) {
            sessionStorage.setItem('user', JSON.stringify(await data.json()))
        }
        else {
            var message = 'Invalid data:\n';
            const jsonData = JSON.parse(JSON.stringify(await data.json()));
            for (var key in jsonData)
                message += jsonData[key] + '\n';

            alert(message);
        }

        closeForm();
    }
    const openFile = () => {
        $('.file-input').click();
    }

    const closeForm = () => {
        //External method of Profile menu to hide this form
        props.onClick();
    }

    const renderImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            var image = (reader.result).split(',')[1];
            user.avatar = image;
            ref_image.current.src = "data:image/jpeg;base64, " + image;
        }
        reader.readAsDataURL(file);
    }

    const [email, setEmail] = useState(user.email);
    const [fName, setFName] = useState(user.firstName);
    const [lName, setLName] = useState(user.lastName);
    const [password, setPassword] = useState('');

    const [firstNameDirty, setFirstNameDirty] = useState(false);
    const [lastNameDirty, setLastNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailHandler = (e) => {
        setEmail(e);
        if (!regExpUtil.EMAIL_REG_EXP.test(String(e))) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('')
        }
    }
    const firstNameHandler = (e) => {
        setFName(e);
        if (e.length < 2) {
            setFirstNameError('First name cannot be less than 2 characters ')
        } else if (e.length > 30) {
            setFirstNameError('First name cannot be more than 30 characters ')
        } else if (!regExpUtil.FIRST_NAME_REG_EXP.test(String(e))) {
            setFirstNameError('First name can only contain letters and should start with Upper case')
        } else {
            setFirstNameError('')
        }
    }

    const lastNameHandler = (e) => {
        setLName(e);
        if (e.length < 2) {
            setLastNameError('Last name cannot be less than 2 characters ')
        } else if (e.length > 30) {
            setLastNameError('Last name cannot be more than 30 characters ')
        } else if (!regExpUtil.LAST_NAME_REG_EXP.test(String(e))) {
            setLastNameError('Last name can only contain letters and should start with Upper case')
        } else {
            setLastNameError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e)
        if (e.length < 6) {
            setPasswordError('password cannot be less than 6 characters ')
        } else if (e.length > 30) {
            setPasswordError('password cannot be more than 30 characters ')
        } else if (!regExpUtil.PASSWORD_REG_EXP.test(String(e))) {
            setPasswordError('password should have at least one uppercase letter, one lowercase letter and one number')
        } else {
            setPasswordError('')
        }
    }


    return <div className="wrapper">
        <input className="file-input" type="file" style={{ display: 'none' }} onChange={renderImage} />
        <Avatar ref={ref_image} onClick={openFile} width="20%" src={user.avatar === null ? default_user : "data:image/jpeg;base64, " + user.avatar}></Avatar>

        <label htmlFor="username" className="form__label">username</label><input disabled type="text" className="form__field" value={user.username} name="username" id='username' />

        <label htmlFor="email" className="form__label">e-mail
            {(emailDirty && emailError) && <p style={{ color: 'red' }}>{emailError}</p>}
        </label>
        <input type="text" onBlur={onDirtyEmail => setEmailDirty(true)} ref={ref_email} onChange={changeEmail => emailHandler(changeEmail.target.value)} className="form__field" name="email" id='email' value={email} />

        <label htmlFor="firstName" className="form__label">first name
            {(firstNameDirty && firstNameError) && <p style={{ color: 'red' }}>{firstNameError}</p>}
        </label>
        <input type="text" onBlur={onDirtyFirstName => setFirstNameDirty(true)} ref={ref_firstName} onChange={changeFName => firstNameHandler(changeFName.target.value)} value={fName} className="form__field" name="firstName" id='firstName' />

        <label htmlFor="lastname" className="form__label">last name
            {(lastNameDirty && lastNameError) && <p style={{ color: 'red' }}>{lastNameError}</p>}
        </label>
        <input type="text" onBlur={onDirtyLastName => setLastNameDirty(true)} ref={ref_lastName} value={lName} onChange={changeLName => lastNameHandler(changeLName.target.value)} className="form__field" name="lastname" id='lastname' />

        <label htmlFor="newPassword" className="form__label">new password
            {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        </label>
        <input type="password" value={password} onBlur={onPassDirty => setPasswordDirty(true)} onChange={changePass => passwordHandler(changePass.target.value)} className="form__field" name="newPassword" id='newPassword' />

        <div className="btns">
            <button className="edit_btn cancel_btn" onClick={closeForm}>Cancel</button>
            <button className="edit_btn" onClick={saveUser}>Save</button>
        </div>
    </div>
}
export default ProfilePage;