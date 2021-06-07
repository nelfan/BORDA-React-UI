import './notificationWrapper.css';
import React from 'react';
import InvitationElement from './InvitationElement';

const NotificationWrapper=(props) => {
    const notifications = props.notifications;
    const listItems = notifications.map((notification) => <InvitationElement notification={notification}></InvitationElement>);

    return (
    <div className="mainNotificationsWrapper">

          <div className="mainNotificationsWrapperClose">
          <i className="fa fa-times" aria-hidden="true"  onClick={props.onClick}></i>
          </div>
          {listItems}
    </div>
    
    );
    
}

export default NotificationWrapper;
/*<i class="fa fa-times" className="mainNotificationsCloser"  onClick={props.onClick}></i>
        <i class="fa fa-times" aria-hidden="true"></i>*/