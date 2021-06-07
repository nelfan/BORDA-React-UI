import './profilePage.css';
import default_user from '../../assets/images/default-user.jpg';
import Avatar from './Avatar/Avatar';
import React, { useRef, useState} from 'react';
import $ from 'jquery';

const ProfilePage = (props) => {
    const ref_image = React.createRef();
    const ref_email = useRef(null);
    const ref_firstName = useRef(null);
    const ref_lastName = useRef(null);
    const ref_newPassword = useRef(null);
    const user = JSON.parse(sessionStorage.getItem('user'));
    

    const saveUser = async () => {
        const emailval = ref_email.current.value.length === 0 || !ref_email.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? user.email : ref_email.current.value;
        const fnameval = ref_firstName.current.value.length === 0 ? user.firstName : ref_firstName.current.value;
        const lnameval = ref_lastName.current.value.length === 0 ? user.lastName : ref_lastName.current.value;
        const avatarval = user.avatar;

        const update_user = {
            'email': emailval,
            'firstName': fnameval,
            'lastName': lnameval,
            'password': ref_newPassword.current.value,
            'avatar': avatarval           
        }

        const res = await fetch('http://localhost:9090/users/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(update_user),
        }).then(response => response.json())
        .then(data => sessionStorage.setItem('user',JSON.stringify(data)));

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
            var data = (reader.result).split(',')[1];
            user.avatar = data;
            ref_image.current.src = "data:image/jpeg;base64, " + data;
        }
        reader.readAsDataURL(file);
    }

    const [email, setEmail] = useState(user.email);
    const [fName, setFName] = useState(user.firstName);
    const [lName, setLName] = useState(user.lastName);

    return <div className="wrapper">
        <input className="file-input" type="file" style={{ display: 'none' }} onChange={renderImage} />
        <Avatar ref={ref_image} onClick={openFile} width="20%" src={user.avatar === null ? default_user : "data:image/jpeg;base64, " + user.avatar}></Avatar>
        <label htmlFor="username" className="form__label">username</label><input disabled type="text" className="form__field" value={user.username} name="username" id='username' />
        <label htmlFor="email" className="form__label">e-mail</label>
        <input type="text" ref={ref_email} onChange={e => setEmail(e.target.value)} className="form__field" name="email" id='email' value={email} />
        <label htmlFor="firstName" className="form__label">first name</label>
        <input type="text" ref={ref_firstName} onChange={e => setFName(e.target.value)} value={fName} className="form__field" name="firstName" id='firstName' />
        <label htmlFor="lastname" className="form__label">last name</label>
        <input type="text" ref={ref_lastName} value={lName} onChange={e => setLName(e.target.value)} className="form__field" name="lastname" id='lastname' />
        <label htmlFor="newPassword" className="form__label">new password</label><input type="password" ref={ref_newPassword}  className="form__field" name="newPassword" id='newPassword' />
        <div className="btns">
            <button className="edit_btn cancel_btn" onClick={closeForm}>Cancel</button>
            <button className="edit_btn" onClick={saveUser}>Edit</button>
        </div>
    </div>
}
export default ProfilePage;