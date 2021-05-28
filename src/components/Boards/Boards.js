import BoardView from '../Boards/BoardView/BoardView';
import './boards.css';
import {useEffect, useState} from "react";
import ButtonToAddBoard from "./AddBoard/ButtonToAddBoard";


const Boards = () => {

    const [boardsViews, setBoardViews] = useState([])

    const ownBoards = boardsViews.filter(boardView => boardView.userBoardRelations[0].boardRole.name === 'OWNER');
    const collabBoards = boardsViews.filter(boardView => boardView.userBoardRelations[0].boardRole.name != 'OWNER');

    //console.log("ownBoards[0]: " + ownBoards[0]);
    //console.log("collabBoards[0]: " + collabBoards[0].id);

    useEffect(() => {
        const getBoards = async () => {
            const boardsFromServer = await fetchBoards()
            setBoardViews(boardsFromServer)
        }
        getBoards()
    }, [])

    const fetchBoards = async () => {
        const res = await fetch('http://localhost:9090/users/1/boards')
        return await res.json()
    }

    return (
        <div className="main_content">
        <div class="boards_content">
            <div className="header">
                Header
            </div>
            <div className="creating-board">
                <ButtonToAddBoard color='blue' text='Add' onClick={onclick} />
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
