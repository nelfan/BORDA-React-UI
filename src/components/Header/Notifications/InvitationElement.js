import './invitationElement.css';
import React, {useState, useEffect} from 'react';

const InvitationElement=(props) => {

    const[seen, setSeen] = useState(props.notification.isAccepted==null);
    const accept=async()=>{

        const body={
            'isAccepted':true
        }

        const res = await fetch('http://localhost:9090/users/invitations/'+props.notification.id, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(body)
        });
        setSeen(false);
    }

    const decline=async()=>{

        const body={
            'isAccepted':false
        }

        const res = await fetch('http://localhost:9090/users/invitations/'+props.notification.id, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(body)
        });
        setSeen(false);
    }

    return(
        <div className="invitationWrapper">
            <div className="data">
                <p>Board: {props.notification.board.boardName}</p>
                <p>Sender: {props.notification.sender.firstName+" "+props.notification.sender.lastName}</p>
                <p>Your role: {props.notification.userBoardRole.name}</p>
            </div>
            {(seen)&& 
            <div className="operations">
                <input type="button" value="Accept" className="accept" onClick={accept}/>
                <input type="button" value="Decline" className="decline" onClick={decline}/>
            </div>
            }
        </div>
    )

}

export default InvitationElement;