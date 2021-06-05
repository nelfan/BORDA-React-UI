import React, {useState} from 'react';
import defaultIMG from "../../../../assets/images/default-user.jpg";
import "./members.css"

function Member(props) {
    const [members, addMembers] = useState([])
    const [counterValue, setCounterValue] = useState();

    const list = props.data && props.data.map(item => {
        return <li key={item.name}><img src={item.icon} alt={item.icon}/></li>
    })

    return <div className="task_members">
        <div className="task_members_tit">
            <i className="fa fa-users"/>
            <span>Members</span>
        </div>
        <div className="task_members_content">
            <ul className="task_members_ul">
                {props.showUsersMenu ? list : <span className="default_behaviour">No Members</span>}
            </ul>
            <div className="add_a_members_to_task">
                <i className="fa fa-plus-square" onClick={props.showUsersMenu}/>
                {props.isOpen ? <ul className="list_of_members">
                    <li key={1} onClick={props.clickAddMember}>
                        <div className="user_info_task_members">
                            <div className="member_avatar">
                                <img src={defaultIMG} alt={defaultIMG}/>
                            </div>
                            <div className="member_name">
                                <span>David Chursa</span>
                            </div>
                        </div>
                    </li>
                    <li key={2} onClick={props.clickAddMember}>
                        <div className="user_info_task_members">
                            <div className="member_avatar">
                                <img src={defaultIMG} alt={defaultIMG}/>
                            </div>
                            <div className="member_name">
                                <span>Roman Chursa</span>
                            </div>
                        </div>
                    </li>
                </ul> : null}
            </div>
        </div>
        <ul style={{display: "none"}} className="display_task_members">
            <div className="triangle triangle-4"/>
        </ul>
    </div>

}

export default Member