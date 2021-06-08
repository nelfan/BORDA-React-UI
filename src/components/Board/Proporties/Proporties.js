import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import './proporties.css';
import Invite from '../../Header/Notifications/Invite';

const Proporties = (props) => {

    const id = props.id;
    const[seen, setSeen] = useState(false);
    const showInvite = () => {
        setSeen(!seen);
      };


    return <div className='proportiesLine'>
        <div className="boardOptions">
        <i class="fa fa-user-plus" aria-hidden="true" onClick={showInvite}></i>
        </div>
        {(seen)&&<Invite id={id} close={showInvite}></Invite>}
    </div>
}

export default Proporties;