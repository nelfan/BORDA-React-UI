import React, { useState } from 'react';
import MiniAvatar from '../../../Header/HeaderOptions/MiniAvatar/MiniAvatar';
import MoveTicket from '../../TicketWindow/MoveTicket/MoveTicket';
import "./ticket.css"

function Ticket(props) {
    const [editTicket, setEditTicket] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);

    const editMenu = () => {
        setEditTicket(!editTicket);
    }

    const toggleMoveTicketMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const labels = props.data.tags.map(item => {
        return <li key={item.id} style={{ background: item.color }}>
            <span>{item.text}</span>
        </li>
    });

    const members = props.data.members.map(item => {
        return <li key={item.id} style={{ background: item.color }}>
            <MiniAvatar user={item} />
            <span style={{ display: "none" }}>{item.name}</span>
        </li>
    });

    return <li key={props.data.id} data-draggable="item" data-task="1" className="item">
        {toggleMenu ?
            <MoveTicket boardId={props.boardId} columnId={props.columnId} ticketId={props.data.id} moveTicket={props.moveTicket} toggleMenu={toggleMoveTicketMenu} boardColumns={props.boardColumns} /> : null}
        <div className="task_header">
            <span>{props.data.title}</span>
            <i className="fa fa-ellipsis-v" onClick={editMenu}>
                {editTicket ? <ul className="edit_task_window">
                    <li key={'view'} className="view_task" onClick={() => { toggleMoveTicketMenu() }}><span>Move</span>
                        <i className="show_task_i fa fa-file" />
                    </li>
                    <li key={'edit'} className="edit_task" onClick={() => { props.toggleTicketEdit(props.data) }}><span>Edit</span>
                        <i className="edit_task_i fa fa-edit" /></li>
                    <li key={'delete'} className="delete_task" onClick={() => { props.deleteTicket(props.data.id) }}><span>Delete</span>
                        <i className="delete_task_i fa fa-trash" />
                    </li>
                </ul> : null}
            </i>
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
        </div>
    </li>
}

export default Ticket