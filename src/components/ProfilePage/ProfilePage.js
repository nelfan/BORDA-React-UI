import './profilePage.scss';
import default_user from '../../assets/images/default-user.jpg';
import Avatar from './Avatar/Avatar';
import {useEffect, useState, useRef} from 'react';
import $ from 'jquery';
import React from 'react';
const ProfilePage = (props) =>{
    const ref_image = React.createRef();
    const ref_email = useRef(null);
    const ref_firstName = useRef(null);
    const ref_lastName = useRef(null);
    const [user, setUser] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('http://localhost:9090/users/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') 
                }
            })
            const data = await res.json();
            setUser(await data)
        }
        getUser()
    }, [])

    const saveUser = async () => {
        const emailval = ref_email.current.value.length===0 || !ref_email.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)?user.email:ref_email.current.value;
        const fnameval = ref_firstName.current.value.length===0?user.firstName:ref_firstName.current.value;
        const lnameval = ref_lastName.current.value.length===0?user.lastName:ref_lastName.current.value;
        const avatarval = user.avatar;
        const update_user = {
            'username': user.username,
            'email': emailval,
            'firstName':fnameval,
            'lastName':lnameval,
            'avatar':avatarval
        }
        console.log(update_user);
        const res = await fetch('http://localhost:9090/users/update', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') 
            },
            body: JSON.stringify(update_user),
        })

       // const data = await res.json()
       props.onClick();       
    }
    const open_file = () =>{
        $('.file-input').click();
    }



    const render_image  = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {

          var data=(reader.result).split(',')[1];
          user.avatar = data;
          ref_image.current.src = "data:image/jpeg;base64, "+data;
        }
        reader.readAsDataURL(file);
      }


    return <div className="wrapper">
        <input className="file-input" type="file" style={{ display: 'none'}} onChange={render_image} />
        <Avatar ref ={ref_image} onClick = {open_file} src={user.avatar===null?default_user:"data:image/jpeg;base64, "+user.avatar}></Avatar>
        <label htmlFor="username" className="form__label">username</label><input disabled type="input" className="form__field" value={user.username} name="username" id='username'/>
        <label htmlFor="email" className="form__label">e-mail</label><input type="input" ref={ref_email} className="form__field" name="email" id='email' placeholder={user.email} />
        <label htmlFor="firstName" className="form__label">first name</label><input type="input"ref={ref_firstName} placeholder={user.firstName} className="form__field" name="firstName" id='firstName'/>
        <label htmlFor="lastname" className="form__label">last name</label><input type="input" ref={ref_lastName} placeholder={user.lastName} className="form__field" name="lastname" id='lastname'/>
        <div className="btns">
        <button className="edit_btn cancel_btn" onClick={props.onClick}>Cancel</button>
        <button className="edit_btn" onClick={saveUser}>Edit</button>
        </div>
    </div>
}
export default ProfilePage;