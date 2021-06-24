import React, { useEffect, useState } from 'react';
import "./board.css"
import BoardColumn from "./BoardColumn/BoardColumn";
import Swal from "sweetalert2";
import EventSource from 'eventsource';

function Board(props) {

    const boardId = props.boardId
    const [addNewBoardColumn, setNewBoardColumn] = useState(false);
    const [boardColumns, setBoardColumns] = useState([]);
    const [updateBoardColumnTickets, setUpdateBoardColumnTickets] = useState(false);
    const [currentBoardColumn, setCurrentBoardColumn] = useState({
        name: '',
        key: ''
    })
    const [columnTitleError, setColumnTitleError] = useState('Title cannot be empty')
    const columnTitleDirty = false

    const handleInput = (e) => {
        columnTitleHandler(e.target.value)
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

    const blurHandler = (e) => {
        if (e.target.name === 'board_title') {
            columnTitleDirty(true)
        }
    }

    const columnTitleHandler = async (e) => {
        const re = /^[\s~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
        if (e === '') {
            setColumnTitleError('Title cannot be empty')
        } else if (e.length > 25) {
            setColumnTitleError('Title cannot be more than 25 characters')
        } else if (e.trim().length === 0) {
            setColumnTitleError('Title cannot contain only whitespace characters')
        } else if (!re.test(String(e))) {
            setColumnTitleError('Title can contain only english letters')
        } else {
            setColumnTitleError('')
        }
    }

    const addBoardColumn = async () => {
        const createBoardColumnData = {
            'name': currentBoardColumn.name
        }

        if (columnTitleError !== '') {
            Swal.fire({
                title: 'Invalid column title',
                text: columnTitleError,
                icon: 'warning',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#386DD8'
            })
        } else {
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

    const list = boardColumns.map(boardColumn => {
        return <li key={boardColumn.id}><BoardColumn boardId={boardId} data={boardColumn}
            updateBoardColumn={updateBoardColumn}
            deleteBoardColumn={deleteBoardColumn} toggleUpdateBoardColumnTickets={toggleUpdateBoardColumnTickets}
            updateBoardColumnTickets={updateBoardColumnTickets} boardColumns={boardColumns} tickets={boardColumn.tickets} /></li>
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
                                <span> Add new Column <i className="fa fa-plus"/> </span>
                            </div>
                        }

                        {addNewBoardColumn ?
                            <div className="textfield_of_newboard">
                                <div className="align_of_board_content">
                                    <div className="board_title">
                                        <input id="board_title" onBlur={e => {
                                            blurHandler(e)
                                        }} onChange={handleInput} type="text"
                                               placeholder="Enter a column title" autoComplete="off"
                                               value={currentBoardColumn.name} required/>
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