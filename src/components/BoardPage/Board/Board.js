import React, {useEffect, useState} from 'react';
import "./board.css"
import BoardColumn from "./BoardColumn/BoardColumn";
import Swal from "sweetalert2";

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
    const ColumnTitleDirty = false

    const handleInput = (e) => {
        columnTitleHandler(e.target.value)
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
        return await res.json()
    }

    const blurHandler = (e) => {
        if (e.target.name === 'board_title') {
            ColumnTitleDirty(true)
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
                                                     updateBoardColumn={updateBoardColumn}
                                                     refreshBoardColumns={refreshBoardColumns}
                                                     deleteBoardColumn={deleteBoardColumn}
                                                     toggleUpdateBoardColumnTickets={toggleUpdateBoardColumnTickets}
                                                     updateBoardColumnTickets={updateBoardColumnTickets}/></li>
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