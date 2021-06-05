import React, {useState} from 'react';
import "./ticket.css"

function Ticket(props) {
    const [editTicket, setEditTicket] = useState(false);

    const editMenu = () => {
        setEditTicket(!editTicket);
    }

    const labels = props.data.labels.map(item => {
        return <li key={item.name} style={{background: item.color}}>
            <span style={{display: "none"}}>{item.name}</span>
        </li>
    });

    const members = props.data.members.map(item => {
        return <li key={item.name} style={{background: item.color}}>
            <img src={item.icon} alt={item.icon}/>
            <span style={{display: "none"}}>{item.name}</span>
        </li>
    });

    return <li key={props.data.date} data-draggable="item" data-task="1" className="item">
        <div className="task_header">
            <span>{props.data.title}</span>
            <i className="fa fa-ellipsis-v" onClick={editMenu}>
                {editTicket ? <ul className="edit_task_window">
                    <li key={'view'} className="view_task"><span>View</span><i className="show_task_i fa fa-file"/>
                    </li>
                    <li key={'edit'} className="edit_task"><span>Edit</span><i
                        className="edit_task_i fa fa-edit"/></li>
                    <li key={'delete'} className="delete_task"><span>Delete</span><i
                        className="delete_task_i fa fa-trash"/>
                    </li>
                </ul> : null}
            </i>
        </div>
        <div className="align_task_bg">
            <div className="task_bg">
                <img src={props.data.bg} alt={'Image'}/>
            </div>
        </div>
        <div className="align_task_labels_win">
            <div className="task_labels_win">
                <ul>
                    {labels}
                </ul>
            </div>
        </div>
        <div className="align_task_members_win">
            <div className="task_members_win">
                <ul>
                    {members}
                </ul>
            </div>
        </div>
        <div className="task_description">
            {props.data.description}
        </div>
        <div className="task_items">
            <ul className="task_members_list">
            </ul>
            <div className="short_inf_task">
                <span>{props.data.date}</span>
            </div>
        </div>
    </li>
}

export default Ticket