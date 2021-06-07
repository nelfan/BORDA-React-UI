import React from 'react'
import "./header_options.css"
import MiniAvatar from './MiniAvatar/MiniAvatar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Notifications from '../Notifications/Notification';

function HeaderOptions() {
    return <div className="right_side" style={{
        width: "50%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-end"
    }}>
        <div className="general_info">
            <Notifications></Notifications>
            <ProfileMenu></ProfileMenu>
            <MiniAvatar></MiniAvatar>
        </div>
    </div>
}

export default HeaderOptions