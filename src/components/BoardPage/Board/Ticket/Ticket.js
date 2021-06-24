import React, { useState } from 'react';
import MiniAvatar from '../../../Header/HeaderOptions/MiniAvatar/MiniAvatar';
import "./ticket.css"

function Ticket(props) {
    const [editTicket, setEditTicket] = useState(false);

    const editMenu = () => {
        setEditTicket(!editTicket);
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

    const checkProps = () => {
        if (sessionStorage.getItem('isFiltered') == 'undefined') return true;
        if (!sessionStorage.getItem('isFiltered')) return true;
        var t = JSON.parse(sessionStorage.getItem('filteredTickets'));
        var isValid = t.filter(
            function (el) {
                return el.id == props.data.id;
            }
        ).length == 1;

        return isValid;
    }

    return (
        checkProps() ? <li key={props.data.id} data-draggable="item" data-task="1" className="item"
            {...props.draggableProps} {...props.dragHandleProps} {...props.ref} >
            <div ref={props.innerRef} >
                <div className="task_header">
                    <span>{props.data.title}</span>
                    <i className="fa fa-ellipsis-v" onClick={editMenu}>
                        {editTicket ? <ul className="edit_task_window">
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
            </div>
        </li>
        :
        null
    )
}

export default Ticket