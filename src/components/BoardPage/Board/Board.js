import React, { useEffect, useState } from 'react';
import "./board.css"
import BoardColumn from "./BoardColumn/BoardColumn";

function Board(props) {

    const boardId = props.boardId
    const [addNewBoardColumn, setNewBoardColumn] = useState(false);
    const [boardColumns, setBoardColumns] = useState([]);
    const [updateBoardColumnTickets, setUpdateBoardColumnTickets] = useState(false);
    const [currentBoardColumn, setCurrentBoardColumn] = useState({
        name: '',
        key: ''
    })

    const handleInput = (e) => {
        setCurrentBoardColumn({
            name: e.target.value
        })
    }

    useEffect(() => {
        const getBoardColumns = async () => {
            await refreshBoardColumns()
        }
        getBoardColumns()
    }, [])

    const refreshBoardColumns = async () => {
        const boardsColumnsFromServer = await fetchBoardColumns()
        setBoardColumns(boardsColumnsFromServer)
    }

    const fetchBoardColumns = async () => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        const reader = res.body.getReader();
        const eventSource = new EventSource()
        eventSource.addEventListener()
        // const body = JSON.parse((await res.text()).replace('data:', ''))
        // console.log(body.body)
        // return body.body
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        })
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

        refreshBoardColumns()
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

        refreshBoardColumns()
    }

    const toggleUpdateBoardColumnTickets = () => {
        setUpdateBoardColumnTickets(!updateBoardColumnTickets)
    }

    const list = boardColumns.map(boardColumn => {
        return <li key={boardColumn.id}><BoardColumn boardId={boardId} data={boardColumn}
            updateBoardColumn={updateBoardColumn} refreshBoardColumns={refreshBoardColumns}
            deleteBoardColumn={deleteBoardColumn} toggleUpdateBoardColumnTickets={toggleUpdateBoardColumnTickets}
            updateBoardColumnTickets={updateBoardColumnTickets} /></li>
    })

    return <ul className="default_main" id="defaultMain">
        {list}
        <li className="addNewBoardColumn" id="default">
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
}

export default Board