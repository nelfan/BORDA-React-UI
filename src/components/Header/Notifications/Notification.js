import './notification.css';
import React, {useState, useEffect} from 'react';
import NotificationWrapper from './NotificationWrapper';

const Notification = () =>{

    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const [unread, setUnread] = useState([]);
    const [seen, setSeen] = useState(false);

    const ShowNotifications = () => {
        setSeen(!seen);
      };

    useEffect(() => {
        const getInviations = async () => {     
            const nfs = await fetchInviations();
            setNotifications(nfs);
            nfs.forEach(
                function getUnread( val ) {
                    if(val.isAccepted==null){
                        unread.push(val);
                    }
                }
            )
            setNotificationsCount(unread.length);
        }
        getInviations()
    }, [])

    const fetchInviations = async () => {
        const res = await fetch('http://localhost:9090/users/invitations', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        const data = await res.json();
        return data;
    }


    return(
        <div className="notificationContainer">
            <i className="fa fa-envelope" onClick={ShowNotifications}></i>
            <span className="countOfUnread">{notificationsCount}</span>
            {seen ? <NotificationWrapper notifications = {notifications} onClick={ShowNotifications} /> : null}
        </div>
        
    )
}

export default Notification;