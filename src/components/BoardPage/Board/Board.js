import React, { useEffect, useState } from 'react';
import "./board.css"
import BoardColumn from "./BoardColumn/BoardColumn";
import EventSource from 'eventsource';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Board(props) {

    const boardId = props.boardId
    const [addNewBoardColumn, setNewBoardColumn] = useState(false);
    const [boardColumns, setBoardColumns] = useState([]);
    const [updateBoardColumnTickets, setUpdateBoardColumnTickets] = useState(false);
    const [currentBoardColumn, setCurrentBoardColumn] = useState({
        name: '',
        key: '',
        positionIndex: 0.0
    })

    const handleInput = (e) => {
        setCurrentBoardColumn({
            name: e.target.value
        })
    }

    useEffect(() => {
        fetchBoardColumns();
    }, [])

    const fetchBoardColumns = async () => {
        const eventSource = new EventSource('http://localhost:9090/boards/' + boardId + '/columns', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setBoardColumns(data);
        };

        return () => {
            eventSource.close();
        };
    }

    const addBoardColumn = async () => {
        const createBoardColumnData = {
            'name': currentBoardColumn.name
        }

        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(createBoardColumnData),
        })

        const data = await res.json()

        setBoardColumns([...boardColumns, data])

        setCurrentBoardColumn({
            name: '',
            key: ''
        })
    }

    const newBoardColumn = () => {
        setNewBoardColumn(!addNewBoardColumn)
    }

    const cancelAddNewBoardColumn = () => {
        setNewBoardColumn(false)
    }

    const deleteBoardColumn = async (key) => {
        await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + key, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
    }

    const updateBoardColumn = async (name, key) => {
        const updateBoardColumnData = {
            'id': key,
            'name': name
        }

        await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + key, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(updateBoardColumnData),
        })
    }

    const toggleUpdateBoardColumnTickets = () => {
        setUpdateBoardColumnTickets(!updateBoardColumnTickets)
    }

    function handleOnDragEnd(result) {
        // if (!result.destination) return;

        // const items = Array.from(characters);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);

        // updateCharacters(items);
    }

    const list = boardColumns.map(boardColumn => {
        var id = boardColumn.id;
        var index = (boardColumn.positionIndex * 100) | 0;
        return <Draggable key={boardColumn.id} draggableId={id.toString()} index={index}>
            {(provided) => (
                <li {...provided.draggableProps} {...provided.dragHandleProps} {...provided.innerRef}>
                    <BoardColumn boardId={boardId} data={boardColumn}
                        updateBoardColumn={updateBoardColumn}
                        deleteBoardColumn={deleteBoardColumn} toggleUpdateBoardColumnTickets={toggleUpdateBoardColumnTickets}
                        updateBoardColumnTickets={updateBoardColumnTickets} boardColumns={boardColumns} tickets={boardColumn.tickets} innerRef={provided.innerRef} />
                </li>)}
        </Draggable>
    })

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="columns">
                {(provided) => (
                    <ul className="default_main" id="defaultMain" {...provided.droppableProps} ref={provided.innerRef}>
                        {list}
                        <li ref={provided.innerRef} key={0} className="addNewBoardColumn" id="default" >
                            <div className="align_btn_add_board">
                                <div className="align_add_bord">
                                    <form>
                                        {addNewBoardColumn ?
                                            <div className="add_board_ok_cancel">
                                                <span className="ok_board" onClick={addBoardColumn}>Ok</span>
                                                <span className="cancel_board" onClick={cancelAddNewBoardColumn}> Cancel </span>
                                            </div> :
                                            <div className="add_board" onClick={newBoardColumn}>
                                                <span> Add new Column <i className="fa fa-plus" /> </span>
                                            </div>
                                        }

                                        {addNewBoardColumn ?
                                            <div className="textfield_of_newboard">
                                                <div className="align_of_board_content">
                                                    <div className="board_title">
                                                        <input id="board_title" onChange={handleInput} type="text"
                                                            placeholder="Enter a column title" autoComplete="off"
                                                            value={currentBoardColumn.name} required />
                                                    </div>
                                                </div>
                                            </div> : null}
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
            </Droppable>
        </DragDropContext>)
}

export default Board