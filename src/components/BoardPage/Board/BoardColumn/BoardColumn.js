import React, { useEffect, useState } from 'react';
import "./board_column.css"
import BoardColumnMenu from "./BoardColumnMenu/BoardColumnMenu";
import serialize from 'form-serialize';
import TicketCreate from "../../TicketWindow/TicketCreate";
import TicketWindow from "../../TicketWindow/TicketWindow";
import Ticket from "../Ticket/Ticket";

function BoardColumn (props) {
    
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
    const refreshColumns = async () => props.refreshBoardColumns

    useEffect(() => {
        const getTickets = async () => {
            refreshTickets()
        }
        getTickets()
    }, [props.updateBoardColumnTickets])

    const refreshTickets = async () => {
        const ticketsFromServer = await fetchTickets()
        setTickets(ticketsFromServer)
    }

    const fetchTickets = async () => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + key + '/tickets', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

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
        if (editTicketShow) {
            setTickets(await fetchTickets())
        }
        setEditTicketShow(!editTicketShow);
    }

    const moveTicket = async (newColumnId, ticketId) => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + key + '/move/' + newColumnId + '/tickets/' + ticketId, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        await res.json()

        props.toggleUpdateBoardColumnTickets()
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

        setTickets(await fetchTickets())
    }

    const list = tickets.map(item => {
        return <Ticket data={item} boardId={boardId} columnId={key} toggleTicketEdit={toggleTicketEdit} moveTicket={moveTicket} deleteTicket={deleteTicket} refreshColumns={refreshColumns} />
    })

    return <div className="default_ul">
        <div className="list_header" style={{ background: color }}>
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
        <ul data-draggable="target" className="target">
            {list}
            <div className="btn_new_activity">

            </div>
        </ul>
        <div className="btn_add_item" onClick={toggleTicket}>
            <a>
                <span>Add a task</span>
                <i className="fa fa-plus-square" />
            </a>
        </div>
        {addNewTicket ? <TicketCreate boardId={boardId} columnId={key} ticket={addTicket} cancelBtn={toggleTicket} /> : null}
        {editTicketShow ? <TicketWindow boardId={boardId} columnId={key} ticket={currentTicket} cancelBtn={toggleTicketEdit} /> : null}
    </div>
}


export default BoardColumn