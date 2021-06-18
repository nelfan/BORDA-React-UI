import React from 'react';
import "./board_page.css"
import Board from "./Board/Board";
import Header from '../Header/Header';
import Proporties from './Proporties/Proporties';


function BoardPage(props) {
    
    const id = props.location.state.id;
    return <div className="content">
        <Header></Header>
        <Proporties id = {id}></Proporties>
        <div className="main_content">
            <div className="active_borda_items">
                <Board boardId={id}/>
            </div>
        </div>
    </div>
}

export default BoardPage