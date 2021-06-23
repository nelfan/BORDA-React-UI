import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import './proporties.css';
import Invite from '../../Header/Notifications/Invite';

const Proporties = (props) => {

    const id = props.id;
    const[seen, setSeen] = useState(false);
    const[boardData, setBoardData] = useState([]);
    const showInvite = () => {
        setSeen(!seen);
      };

      useEffect(() => {
        const getBoardData = async () => {
            const board = await fetchBoardData()
            setBoardData(board);
            console.log(board);
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
        </div>
        {(seen)&&<Invite id={id} close={showInvite}></Invite>}
    </div>
}

export default Proporties;