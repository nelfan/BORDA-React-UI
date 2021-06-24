import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import './proporties.css';
import Invite from '../../Header/Notifications/Invite';
import Filter from './Filter/Filter';

const Proporties = (props) => {

    const id = props.id;
    const[seenInvite, setSeenInvite] = useState(false);
    const[seenFilter, setSeenFilter] = useState(false);
    const[boardData, setBoardData] = useState([]);

    const showInvite = () => {
        setSeenInvite(!seenInvite);
    };

    const showFilter = () => {
        setSeenFilter(!seenFilter);
    };

    useEffect(() => {
        const getBoardData = async () => {
            const board = await fetchBoardData()
            setBoardData(board);
        }
        getBoardData()
    }, [])

    const fetchBoardData = async () => {
        const res = await fetch('http://localhost:9090/boards/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    return <div className='proportiesLine'>
        <div className="boardOptions">
            <div className="boardName">{boardData.name}</div>
        <i class="fa fa-user-plus" aria-hidden="true" onClick={showInvite}></i>
        <i class="fa fa-filter" aria-hidden="true" onClick={showFilter}></i>
        </div>
        {(seenInvite)&&<Invite id={id} close={showInvite}></Invite>}
        {(seenFilter)&&<Filter id={id} close={showFilter} ></Filter>}
        </div>
}

export default Proporties;