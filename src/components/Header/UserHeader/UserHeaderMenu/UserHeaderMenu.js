import React from 'react';
import "./user_header_menu.css"

function UserHeaderMenu() {
    return <div className="user_submenu">
        <ul>
            <li className="user_profile"><span>Profile</span><i className="fa fa-id-badge"/></li>
            <li className="user_projects"><span>Projects</span><i className="fa fa-folder-open"/></li>
            <li className="user_settings"><span>Settings</span><i className="fas fa-sliders-h"/></li>
            <li className="user_logout"><span>Log out</span><i className="fa fa-times-circle"/></li>
        </ul>
    </div>
}

export default UserHeaderMenu