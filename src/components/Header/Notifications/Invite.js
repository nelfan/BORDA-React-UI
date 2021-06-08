import './invite.css';
import React, {useRef} from 'react';

const Invite=(props) =>{

    const usernameRef = useRef(null);
    const roleRef = useRef(null);

    

    const sendInvite=async()=>{
        const val = usernameRef.current.value;
    const valBoard = props.id;
    const valRole = roleRef.current.value;
         const res = await fetch('http://localhost:9090/users/invitations/'+val+'/boards/'+valBoard+'/roles/'+valRole+'', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
                },
            },{});
        props.close(false);
    }
    

    return <div className="inviteWrapper">
        <label htmlFor="userNameField" className="form__label">Collaborator's username</label>
        <input type="text" ref={usernameRef} className="userNameField"/>

        <div class="inviteOptions">
        <select ref={roleRef} id="userBoardRelational" className="userBoardRelational">
        <option value="1">OWNER</option>
        <option value="2" selected="selected">COLLABORATOR</option>
        </select>

        <input type="button" className="sendBtn" value="Send" onClick={sendInvite}/>
        </div>
    </div>;
}

export default Invite;