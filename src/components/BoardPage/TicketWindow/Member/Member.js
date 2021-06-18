import React, { useState } from 'react';
import MiniAvatar from '../../../Header/HeaderOptions/MiniAvatar/MiniAvatar';
import "./members.css"

function Member(props) {
    const [members, addMembers] = useState([])
    const [counterValue, setCounterValue] = useState();

    const list = props.data && props.data.map(item => {
        return <li key={item.id} ><MiniAvatar user={item} /></li>
    })

    const boardMembers = props.boardMembers && props.boardMembers.map(item => {
        return <li key={item.id} onClick={(e) => { props.clickAddMember(e, item.id) }}>
            <div className="user_info_task_members">
                <div className="member_avatar">
                    <MiniAvatar user={item} />
                </div>
                <div className="member_name">
                    <span>{item.username}</span>
                </div>
            </div>
        </li>
    })

    return <div className="task_members">
        <div className="task_members_tit">
            <i className="fa fa-users" />
            <span>Members</span>
        </div>
        <div className="task_members_content">
            <ul className="task_members_ul">
                {props.showUsersMenu ? list : <span className="default_behaviour">No Members</span>}
            </ul>
            <div className="add_a_members_to_task">
                <i className="fa fa-plus-square" onClick={props.showUsersMenu} />
                {props.isOpen ? <ul className="list_of_members">
                    {boardMembers}
                </ul> : null}
            </div>
        </div>
        <ul style={{ display: "none" }} className="display_task_members">
            <div className="triangle triangle-4" />
        </ul>
    </div>

}

export default Member