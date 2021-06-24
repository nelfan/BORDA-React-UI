import React, { useEffect, useState } from 'react';
import "./board_column.css"
import BoardColumnMenu from "./BoardColumnMenu/BoardColumnMenu";
import serialize from 'form-serialize';
import TicketCreate from "../../TicketWindow/TicketCreate";
import TicketWindow from "../../TicketWindow/TicketWindow";
import Ticket from "../Ticket/Ticket";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function BoardColumn(props) {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);
    const [addNewTicket, setNewTicket] = useState(false);
    const [editTicketShow, setEditTicketShow] = useState(false);
    const [tickets, setTickets] = useState([])
    const [currentTicket, setCurrentTicket] = useState({
        id: '',
        title: '',
        members: [],
        tags: [],
        description: ''
    })

    const key = props.data.id
    const name = props.data.name
    const color = '#6aba96'
    const boardId = props.boardId

    useEffect(() => {
        setTickets(props.tickets.sort((a, b) => (a.positionIndex - b.positionIndex)))
    }, [props.tickets])

    const addTicket = (data) => {
        setTickets([...tickets, data])
    }

    const toggleBoardColumnMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const toggleEditMenu = () => {
        setEditMenu(!editMenu);
        setToggleMenu(false);
    }

    const cancelBtnClickedEditMenu = () => {
        setEditMenu(false);
        setToggleMenu(false);
    }

    const updateBoardColumn = async (e, key) => {
        e.preventDefault();
        let object = serialize(document.querySelector("#edit_boardColumn_form"), { hash: true });
        await props.updateBoardColumn(object.name, key);
        setToggleMenu(!toggleMenu);
        setEditMenu(!editMenu);
    }

    const toggleTicket = () => {
        setNewTicket(!addNewTicket);
    }

    const toggleTicketEdit = async (ticket) => {
        if (ticket !== null) {
            setCurrentTicket({
                id: ticket.id,
                title: ticket.title,
                members: ticket.members,
                tags: ticket.tags,
                description: ticket.description
            })
        }
        setEditTicketShow(!editTicketShow);
    }

    const deleteTicket = async (id) => {
        const ticketId = id
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + key + '/tickets/' + ticketId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
    }

    const list = tickets.map(ticket => {
        return <Draggable key={ticket.id} draggableId={"ticket" + ticket.id.toString()} index={tickets.indexOf(ticket)}>
            {(provided) => (
                <Ticket data={ticket} boardId={boardId} columnId={key} toggleTicketEdit={toggleTicketEdit}
                    deleteTicket={deleteTicket} boardColumns={props.boardColumns}
                    dragHandleProps={provided.dragHandleProps} innerRef={provided.innerRef}
                    draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps}
                    isFiltered={props.isFiltered} getUpdatedTickets={props.getUpdatedTickets} 
                    isTriggered={props.isTriggered} />
            )}
        </Draggable>
    })

    return <div className="default_ul" ref={props.innerRef}>
        <div className="list_header" style={{ background: color }} {...props.dragHandleProps}>
            <span>{name}</span>
            <div className="edit_conf">
                <a onClick={toggleBoardColumnMenu}>
                    <i className="fa fa-ellipsis-v" />
                    {toggleMenu ?
                        <BoardColumnMenu color={color} isClickedEdit={toggleEditMenu} deleteBoardColumn={props.deleteBoardColumn}
                            data={props.data} /> : null}
                    {editMenu ? <ul className="submenu_for_list" style={{ border: "1px solid" + color }}>
                        <li>
                            <form className="edit_form_board_list" id="edit_boardColumn_form">
                                <input type="text" name="name" autoComplete="off" defaultValue={name} />
                                <div className="buttons_container">
                                    <button type="submit" onClick={(e) => updateBoardColumn(e, key)}>Edit</button>
                                    <button onClick={cancelBtnClickedEditMenu}>Cancel</button>
                                </div>
                            </form>
                        </li>
                    </ul> : null}
                </a>
            </div>
        </div>
        <Droppable droppableId={"tickets" + key} type="tickets">
            {(provided) => (
                <ul data-draggable="target" className="target" {...provided.droppableProps} ref={provided.innerRef}>
                    {list}
                    {provided.placeholder}
                    <div className="btn_new_activity" ref={provided.innerRef}>

                    </div>
                </ul>
            )}
        </Droppable>
        <div className="btn_add_item" onClick={toggleTicket}>
            <a>
                <span>Add a task</span>
                <i className="fa fa-plus-square" />
            </a>
        </div>
        {addNewTicket ? <TicketCreate boardId={boardId} columnId={key} ticket={addTicket} cancelBtn={toggleTicket} tickets={tickets} /> : null}
        {editTicketShow ? <TicketWindow boardId={boardId} columnId={key} ticket={currentTicket} cancelBtn={toggleTicketEdit} /> : null}
    </div>
}


export default BoardColumn