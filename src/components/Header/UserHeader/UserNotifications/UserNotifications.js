import React from 'react';
import "./notifications.css"

function UserNotifications() {
    return <div>
        <div className="notification_number"><span>21</span></div>
        <div className="message_box">
            <ul>
                <li>
                    <i className="message fa-comment-dots"/>
                    <span>David Chursa was already invited </span>
                    <i className="close_mess fa fa-times"/>
                </li>
                <li/>
            </ul>
        </div>
    </div>

}

export default UserNotifications