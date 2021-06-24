import React, { useState, useEffect } from 'react';
import "./board_page.css"
import Board from "./Board/Board";
import Header from '../Header/Header';
import Proporties from './Proporties/Proporties';
import { Redirect } from "react-router-dom";

function BoardPage(props) {
    const [isFiltered, setFiltered] = useState(false);
    const [isTriggered, setTriggered] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState([]);

    const updateTickets = (data) => {
        setFilteredTickets(data);
    }

    const getUpdatedTickets = () => {
        return filteredTickets;
    }

    if (props.location.state && props.location.state.id) {
        const id = props.location.state.id;
        return <div className="content">
            <Header />
            <Proporties id={id} isFiltered={isFiltered} setFiltered={setFiltered}
                filteredTickets={filteredTickets} setFilteredTickets={setFilteredTickets}
                getUpdatedTickets={getUpdatedTickets} updateTickets={updateTickets}
                isTriggered={isTriggered} setTriggered={setTriggered} />
            <div className="main_content">
                <div className="active_borda_items">
                    <Board boardId={id} isFiltered={isFiltered} getUpdatedTickets={getUpdatedTickets} isTriggered={isTriggered} />
                </div>
            </div>
        </div>
    } else {
        return <Redirect to="/boards" />
    }
}

export default BoardPage