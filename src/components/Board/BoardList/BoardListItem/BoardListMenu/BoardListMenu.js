import React from 'react';
import "./board_list_menu.css"

function BoardListMenu(props) {
    const {id, color} = props.data;
    return <ul className="submenu_for_list" style={{border: "1px solid" + color}}>
        <div>
            <li className="edit_lsit" onClick={props.isClickedEdit} key={1}>
                <span>Edit</span>
                <i style={{color: props.color}} className="delete fa fa-edit"/>
            </li>
            <li key={2} onClick={() => {props.deleteItem(id)}}>
                <span>Delete</span>
                <i style={{color: props.color}} className="delete fa fa-trash"/>
            </li>
        </div>
    </ul>
}

export default BoardListMenu