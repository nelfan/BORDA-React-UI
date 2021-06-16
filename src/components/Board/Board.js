import React from 'react';
import "./board_page.css"
import BoardList from "./BoardList/BoardList";
import Header from '../Header/Header';
import Proporties from './Proporties/Proporties';
import {Redirect} from "react-router-dom";


function Board(props) {

    if (props.location.state && props.location.state.id) {
        const id = props.location.state.id;
        return <div className="content">
            <Header/>
            <Proporties id={id}></Proporties>
            <div className="main_content">
                <div className="active_borda_items">
                    <BoardList boardId={id}/>
                </div>
            </div>
        </div>
    } else {
        return <Redirect to="/boards"  />
    }
}

export default Board