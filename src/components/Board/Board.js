import React from 'react';
import "./board_page.css"
import HeaderLogo from "../Header/HeaderLogo/HeaderLogo";
import UserHeaderOptions from "../Header/UserHeader/UserHeaderOptions";
import BoardList from "./BoardList/BoardList";

function Board(props) {
    
    const id = props.location.state.id;

    return <div className="content">
        <div className="alignment_of_header">
            <div className="header">
                <HeaderLogo/>
                <UserHeaderOptions/>
            </div>
        </div>
        <div className="main_content">
            <div className="active_borda_items">
                <BoardList boardId={id}/>
            </div>
        </div>
    </div>
}

export default Board