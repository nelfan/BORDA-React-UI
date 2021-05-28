import './boards.css';
import BoardView from '../Boards/BoardView/BoardView';
import {useEffect, useState} from "react";
import InputToAddBoard from "./AddBoard/InputToAddBoard";
import AddBoard from "./AddBoard/AddBoard";


const Boards = () => {

    const [showAddBoard, setShowAddBoard] = useState(false)
    const [boardsViews, setBoardViews] = useState([])

    const ownBoards = Object.values(boardsViews).filter(boardView => boardView.userBoardRelations[0].boardRole.name === 'OWNER');
    const collabBoards = Object.values(boardsViews).filter(boardView => boardView.userBoardRelations[0].boardRole.name !== 'OWNER');

    // GET Boards
    useEffect(() => {
        const getBoards = async () => {
            const boardsFromServer = await fetchBoards()
            setBoardViews(boardsFromServer)
        }
        getBoards()
    }, [])

    const fetchBoards = async () => {
        const res = await fetch('http://localhost:9090/users/boards', {
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

        setBoardViews([...boardsViews, data])

    }

    return (
        <div className="main_content">
            <div className="boards_content">
                <div className="header">
                    Header
                </div>
                <div className="own-boards-label" id="boards-label">
                    My own boards
                </div>
                <div className="own-boards" id="style-scroll">
                    <div className="own-boards-container" id="own-boards-container">
                        <>
                            <div className="boards-info">
                                <div className="new-board-button">
                                    <AddBoard onAdd={() => setShowAddBoard(!showAddBoard)} showAdd={showAddBoard}/>
                                    {showAddBoard && <InputToAddBoard onAdd={addBoard}/>}
                                </div>
                            </div>
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
