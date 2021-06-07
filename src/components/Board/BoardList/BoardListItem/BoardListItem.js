import React, { useEffect, useState } from 'react';
import "./board_list_item.css"
import BoardListMenu from "./BoardListMenu/BoardListMenu";
import serialize from 'form-serialize';
import TicketCreate from "../../TicketWindow/TicketCreate";
import Ticket from "../Ticket/Ticket";

function BoardListItem(props) {

    const background = React.createRef();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);
    const [addNewTicket, setNewTicket] = useState(false);
    const [tickets, setTickets] = useState([])

    const key = props.data.id
    const name = props.data.name
    const color = '#6aba96'
    const boardId = props.boardId

    useEffect(() => {
        const getTickets = async () => {
            const ticketsFromServer = await fetchTickets()
            setTickets(ticketsFromServer)
        }
        getTickets()
    }, [])

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

    const toggleBoardListMenu = () => {
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

    const updateBoardList = async (e, key) => {
        e.preventDefault();
        let object = serialize(document.querySelector("#edit_boardList_form"), { hash: true });
        await props.setUpdate(object.name, key);
        setToggleMenu(!toggleMenu);
        setEditMenu(!editMenu);
    }

    const toggleTicket = () => {
        setNewTicket(!addNewTicket);
    }

    const list = tickets.map(item => {
        return <Ticket data={item} />
    })

    return <div className="default_ul">
        <div className="list_header" style={{ background: color }}>
            <span>{name}</span>
            <div className="edit_conf">
                <a onClick={toggleBoardListMenu}>
                    <i className="fa fa-ellipsis-v" />
                    {toggleMenu ?
                        <BoardListMenu color={color} isClickedEdit={toggleEditMenu} deleteItem={props.deleteItem}
                            data={props.data} /> : null}
                    {editMenu ? <ul className="submenu_for_list" style={{ border: "1px solid" + color }}>
                        <li>
                            <form className="edit_form_board_list" id="edit_boardList_form">
                                <input type="text" name="name" autoComplete="off" defaultValue={name} />
                                <div className="buttons_container">
                                    <button type="submit" onClick={(e) => updateBoardList(e, key)}>Edit</button>
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
    </div>
}


export default BoardListItem