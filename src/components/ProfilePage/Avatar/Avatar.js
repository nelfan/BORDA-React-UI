import './avatar.css';
import React from 'react';

const Avatar = React.forwardRef((props, ref) => {
    return (
        <img className="avatar"  ref = {ref} onClick={props.onClick} src={props.src} width={props.width} alt="User's avatar" accept=".jpg, .jpeg, .png"></img>
    )
    })

export default Avatar; 