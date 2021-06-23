import React from 'react';
import "./board_page.css"
import Board from "./Board/Board";
import Header from '../Header/Header';
import Proporties from './Proporties/Proporties';
import {Redirect} from "react-router-dom";

function BoardPage(props) {

    if (props.location.state && props.location.state.id) {
        const id = props.location.state.id;
        return <div className="content">
            <Header/>
            <Proporties id={id}></Proporties>
            <div className="main_content">
                <div className="active_borda_items">
                    <Board boardId={id}/>
                </div>
            </div>
        </div>
    } else {
        return <Redirect to="/boards"  />
    }
}

export default BoardPage