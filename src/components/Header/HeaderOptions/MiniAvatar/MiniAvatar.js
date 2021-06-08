import React from 'react';
import default_user from '../../../../assets/images/default-user.jpg';
import Avatar from '../../../ProfilePage/Avatar/Avatar';


const MiniAvatar = (userGiven) => {
    var user = userGiven;
    if (Object.getOwnPropertyNames(userGiven).length === 0) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
    return <Avatar width={user == null || user.avatar == null ? "10%" : "20%"} src={user == null || user.avatar == null ? default_user : "data:image/jpeg;base64, " + user.avatar}></Avatar>
}

export default MiniAvatar;