import React from 'react';
import "./board_page.css"
import HeaderLogo from "../Header/HeaderLogo/HeaderLogo";
import UserHeaderOptions from "../Header/UserHeader/UserHeaderOptions";

function Board(props) {
    const boardId = props.location.state;
    return <div className="content">
        <div className="alignment_of_header">
            <div className="header">
                <HeaderLogo/>
                <UserHeaderOptions/>
            </div>
        </div>
        <div className="main_content">
            <div className="active_borda_items">

            </div>
        </div>
    </div>
}

export default Board