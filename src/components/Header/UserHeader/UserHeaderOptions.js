import React, {useState} from 'react';
import "./user_header_options.css"
import UserHeaderMenu from "./UserHeaderMenu/UserHeaderMenu";
import UserNotifications from "./UserNotifications/UserNotifications";

function UserHeaderOptions() {
    const [userMenu, setStateUserMenu] = useState(false)
    const [notificationMenu, setStateNotificationMenu] = useState(false)

    const clickUserMenu = () => {
        setStateUserMenu(!userMenu);
    }

    const clickNotificationIcon = () => {
        setStateNotificationMenu(!notificationMenu);
    }

    return <div className="right-side">
        <div className="alignment_of_items">
            <div className="empty_block"/>
            <div className="general-info">
                <a className="user_icon">
                    <i className="fa fa-user-circle" onClick={clickUserMenu}>
                        {userMenu ? <UserHeaderMenu/> : null}
                    </i>
                </a>
                <a className="notification_icon">
                    <div className="alignment">
                        <i className="fa fa-envelope" onClick={clickNotificationIcon}>
                            {notificationMenu ? <UserNotifications/> : null}
                        </i>
                    </div>
                </a>
                <a><i className="fa fa-map"/></a>
            </div>
        </div>
    </div>
}

export default UserHeaderOptions