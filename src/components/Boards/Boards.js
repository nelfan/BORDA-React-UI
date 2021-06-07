import './boards.css';
import BoardView from '../Boards/BoardView/BoardView';
import { useEffect, useState } from "react";
import InputToAddBoard from "./AddBoard/InputToAddBoard";
import AddBoard from "./AddBoard/AddBoard";
import React from 'react';
import Header from '../Header/Header';

const Boards = () => {

    const [showAddBoard, setShowAddBoard] = useState(false)
    const [ownBoards, setOwnBoards] = useState([])
    const [collabBoards, setCollabBoards] = useState([])

    // GET Boards
    useEffect(() => {
        const getBoards = async () => {
            const ownBoardsFromServer = await fetchBoardsByRoleId(1)
            setOwnBoards(ownBoardsFromServer)
            const collabBoardsFromServer = await fetchBoardsByRoleId(2)
            setCollabBoards(collabBoardsFromServer)
        }
        getBoards()
    }, [])

    const fetchBoardsByRoleId = async (roleId) => {
        const res = await fetch('http://localhost:9090/users/boards/' + roleId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    // Add Board
    const addBoard = async (boardsView) => {
        const createBoardData = {
            'name': boardsView.text
        }

        const res = await fetch('http://localhost:9090/boards', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(createBoardData),
        })

        const data = await res.json()

        setOwnBoards([...ownBoards, data])

        setShowAddBoard(!showAddBoard)
    }

    return (
        <div className="main_content">
            <div className="boards_content">
                <Header></Header>
                <div className="own-boards-label" id="boards-label">
                    My own boards
                </div>
                <div className="own-boards" id="style-scroll">
                    <div className="own-boards-container" id="own-boards-container">
                            <div className="boards-info">
                                <div className="new-board-button">
                                    <AddBoard onAdd={() => setShowAddBoard(!showAddBoard)} showAdd={showAddBoard} />
                                    {showAddBoard && <InputToAddBoard onAdd={addBoard} />}
                                </div>
                            </div>
                            {ownBoards.map((boardView =>
                                <BoardView key={boardView.id} boardView={boardView} />
                            ))}
                    </div>
                </div>
                <div className="all-boards-label" id="boards-label">
                    All boards
                </div>
                <div className="collaboration-boards" id="style-scroll">
                    <div className="collab-boards-container" id="collab-boards-container">
                            {collabBoards.map((boardView =>
                                <BoardView key={boardView.id} boardView={boardView} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boards
