import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import './proporties.css';
import Invite from '../../Header/Notifications/Invite';
import Filter from './Filter/Filter';

const Proporties = (props) => {

    const id = props.id;
    const[seenInvite, setSeenInvite] = useState(false);
    const[seenFilter, setSeenFilter] = useState(false);
    const showInvite = () => {
        setSeenInvite(!seenInvite);
    };

    const showFilter = () => {
        setSeenFilter(!seenFilter);
    };

    return <div className='proportiesLine'>
        <div className="boardOptions">
        <i class="fa fa-user-plus" aria-hidden="true" onClick={showInvite}></i>
        <i class="fa fa-filter" aria-hidden="true" onClick={showFilter}></i>
        </div>
        {(seenInvite)&&<Invite id={id} close={showInvite}></Invite>}
        {(seenFilter)&&<Filter id={id} close={showFilter}></Filter>}
    </div>
}

export default Proporties;