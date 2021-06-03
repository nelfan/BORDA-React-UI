import React, {Component} from 'react';
import "./notifications.css"

class UserNotifications extends Component {
    render() {
        return <div>
            <div className="notification_number"><span>21</span></div>
            <div className="message_box">
                <ul>
                    <li>
                        <i className="message far fa-comment-dots"/>
                        <span>David Chursa was already invited </span>
                        <i className="close_mess fas fa-times"/>
                    </li>
                    <li/>
                </ul>
            </div>
        </div>
    }
}

export default UserNotifications