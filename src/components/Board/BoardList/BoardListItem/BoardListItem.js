import React, {useState} from 'react';
import "./board_list_item.css"
import BoardListMenu from "./BoardListMenu/BoardListMenu";
import serialize from 'form-serialize';

function BoardListItem(props) {
    const background = React.createRef();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);
    const [addNewTicket, setNewTicket] = useState(false);
    const [tickets, setTickets] = useState([])

    const getTicket = (data) => {
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

    const updateBoardList = (e, key) => {
        e.preventDefault();
        let object = serialize(document.querySelector("#edit_boardList_form"), {hash: true});
        props.setUpdate(object, key);
        setToggleMenu(!toggleMenu);
        setEditMenu(!editMenu);
    }

    const toggleTicket = () => {
        setNewTicket(!addNewTicket);
    }

    const {color, title, key} = props.data
    return <div className="default_ul">
        <div className="list_header" style={{background: color}}>
            <span>{title}</span>
            <div className="edit_conf">
                <a href="#" onClick={toggleBoardListMenu}>
                    <i className="fa fa-ellipsis-v"/>
                    {toggleMenu ?
                        <BoardListMenu color={color} isClickedEdit={toggleEditMenu} deleteItem={props.deleteItem}
                                       data={props.data}/> : null}
                    {editMenu ? <ul className="submenu_for_list" style={{border: "1px solid" + color}}>
                        <li>
                            <form className="edit_form_board_list" id="edit_boardList_form" action="#">
                                <input type="text" name="title" autoComplete="off" defaultValue={title}/>
                                <input type="color" name="color" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                                       defaultValue={color}/>
                                <div className="buttons_container">
                                    <button onClick={(e) => updateBoardList(e, key)}>Edit</button>
                                    <button onClick={cancelBtnClickedEditMenu}>Cancel</button>
                                </div>
                            </form>
                        </li>
                    </ul> : null}
                </a>
            </div>
        </div>
        <ul data-draggable="target" className="target">
            <div className="btn_new_activity">

            </div>
        </ul>
        <div className="btn_add_item" onClick={toggleTicket}>
            <a href="#">
                <span>Add a card</span>
                <i className="fa fa-plus-square"/>
            </a>
        </div>
        {/*{addNewTicket ? <TicketWindow ticket={getTicket} cancelBtn={toggleTicket}/> : null}*/}
    </div>
}


export default BoardListItem