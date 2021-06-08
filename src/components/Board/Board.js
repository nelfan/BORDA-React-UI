import React from 'react';
import "./board_page.css"
import BoardList from "./BoardList/BoardList";
import Header from '../Header/Header';
import Proporties from './Proporties/Proporties';


function Board(props) {
    
    const id = props.location.state.id;
    return <div className="content">
        <Header></Header>
        <Proporties id = {id}></Proporties>
        <div className="main_content">
            <div className="active_borda_items">
                <BoardList boardId={id}/>
            </div>
        </div>
    </div>
}

export default Board