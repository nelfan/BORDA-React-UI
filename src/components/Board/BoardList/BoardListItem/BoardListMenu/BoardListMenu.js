import React from 'react';
import "./board_list_menu.css"

function BoardListMenu(props) {
    const {key, color} = props.data;
    return <ul className="submenu_for_list" style={{border: "1px solid" + color}}>
        <div>
            <li className="edit_lsit" onClick={props.isClickedEdit} key={1}>
                <span>Edit</span>
                <i className="edit far fa-edit"/>
            </li>
            <li key={2} onClick={() => {
                props.deleteItem(key)
            }}>
                <span>Delete</span>
                <i className="delete fas fa-trash-alt"/>
            </li>
        </div>
    </ul>
}


export default BoardListMenu