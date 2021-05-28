import './boards.css';
import BoardView from '../Boards/BoardView/BoardView';
import {useEffect, useState} from "react";
import ButtonToAddBoard from "./AddBoard/ButtonToAddBoard";
import InputToAddBoard from "./AddBoard/InputToAddBoard";
import AddBoard from "./AddBoard/AddBoard";


const Boards = () => {

    const [showAddBoard, setShowAddBoard] = useState(true)
    const [boardsViews, setBoardViews] = useState([])

    const ownBoards = boardsViews.filter(boardView => boardView.userBoardRelations[0].boardRole.name === 'OWNER');
    const collabBoards = boardsViews.filter(boardView => boardView.userBoardRelations[0].boardRole.name !== 'OWNER');

    // GET Boards
    useEffect(() => {
        const getBoards = async () => {
            const boardsFromServer = await fetchBoards()
            setBoardViews(boardsFromServer)
        }
        getBoards()
    }, [])

    const fetchBoards = async () => {
        const res = await fetch('http://localhost:9090/users/1/boards', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') 
            }
        })
        return await res.json()
    }


    // Add Board
    const addBoard = async (boardsView) => {
        const res = await fetch('http://localhost:9090/boards/1', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') 
            },
            body: JSON.stringify(boardsView),
        })

        const data = await res.json()
        setBoardViews([...boardsViews, data])

    }

    return (
        <div className="main_content">
            <div className="boards_content">
                <div className="header">
                    Header
                </div>
                <div className="creating-board">
                    <AddBoard onAdd={() => setShowAddBoard(!showAddBoard)} showAdd={showAddBoard}/>
                    {showAddBoard && <InputToAddBoard onAdd={addBoard}/>}
                    <ButtonToAddBoard color='blue' text='Add' onClick={onclick}/>
                </div>
                <div className="own-boards-label" id="boards-label">
                    My own boards
                </div>
                <div className="own-boards" id="style-scroll">
                    <div className="own-boards-container" id="own-boards-container">
                        <>
                            {ownBoards.map((boardView =>
                                    <BoardView key={boardView.id} boardView={boardView}/>
                            ))}
                        </>
                    </div>
                </div>
                <div className="all-boards-label" id="boards-label">
                    All boards
                </div>
                <div className="collaboration-boards" id="style-scroll">
                    <div className="collab-boards-container" id="collab-boards-container">
                        <>
                            {collabBoards.map((boardView =>
                                    <BoardView key={boardView.id} boardView={boardView}/>
                            ))}
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boards
