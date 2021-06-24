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
        let index = boardColumns.length > 0 ?
            (boardColumns[boardColumns.length - 1].positionIndex + 1) :
            1;
        const createBoardColumnData = {
            'name': currentBoardColumn.name,
            'positionIndex': index
        }

        await fetch('http://localhost:9090/boards/' + boardId + '/columns', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(createBoardColumnData),
        })

        setCurrentBoardColumn({
            name: '',
            key: '',
            positionIndex: 0.0
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

    const updateBoardColumn = async (name, key, position) => {
        const updateBoardColumnData = {
            'id': key,
            'name': name,
            'positionIndex': position
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

    const moveTicket = async (oldColumnId, newColumnId, ticketId, positionIndex) => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + oldColumnId + '/move/'
            + newColumnId + '/tickets/' + ticketId + "/position/" + positionIndex, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        await res.json()
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        if(sessionStorage.getItem('isFiltered')) return;

        if (result.type === "columns") {
            const destinationColumnIndex = result.destination.index;
            const index = boardColumns[destinationColumnIndex].positionIndex

            boardColumns.map(boardColumn => {
                if (("column" + boardColumn.id) === result.draggableId) {
                    var newIndex;
                    if (boardColumn.positionIndex > index) {
                        if (destinationColumnIndex == 0) {
                            newIndex = boardColumns[destinationColumnIndex].positionIndex / 2;
                        } else {
                            newIndex = boardColumns[destinationColumnIndex - 1].positionIndex +
                                ((boardColumns[destinationColumnIndex].positionIndex -
                                    boardColumns[destinationColumnIndex - 1].positionIndex) / 2);
                        }
                    } else if (boardColumn.positionIndex < index) {
                        if (destinationColumnIndex == boardColumns.length - 1) {
                            newIndex = boardColumns[destinationColumnIndex].positionIndex + 1;
                        } else {
                            newIndex = boardColumns[destinationColumnIndex].positionIndex +
                                ((boardColumns[destinationColumnIndex + 1].positionIndex -
                                    boardColumns[destinationColumnIndex].positionIndex) / 2);
                        }
                    }
                    updateBoardColumn(boardColumn.name, boardColumn.id, newIndex);
                }
            })
        } else if (result.type === "tickets") {
            var destinationTicketIndex = result.destination.index;
            const sourceParentId = parseInt(result.source.droppableId.replaceAll("tickets", ""));
            const destParentId = parseInt(result.destination.droppableId.replaceAll("tickets", ""));
            const ticketId = parseInt(result.draggableId.replaceAll("ticket", ""));
            var newIndex;

            if (sourceParentId === destParentId) {
                boardColumns.map(boardColumn => {
                    if (boardColumn.id === sourceParentId) {
                        const tickets = boardColumn.tickets;
                        tickets.map(ticket => {
                            const index = tickets[destinationTicketIndex].positionIndex;
                            if (ticket.id === ticketId) {
                                if (ticket.positionIndex > index) {
                                    if (destinationTicketIndex == 0) {
                                        newIndex = tickets[destinationTicketIndex].positionIndex / 2;
                                    } else {
                                        newIndex = tickets[destinationTicketIndex - 1].positionIndex +
                                            ((tickets[destinationTicketIndex].positionIndex -
                                                tickets[destinationTicketIndex - 1].positionIndex) / 2);
                                    }
                                } else if (ticket.positionIndex < index) {
                                    if (destinationTicketIndex == tickets.length - 1) {
                                        newIndex = tickets[destinationTicketIndex].positionIndex + 1;
                                    } else {
                                        newIndex = tickets[destinationTicketIndex].positionIndex +
                                            ((tickets[destinationTicketIndex + 1].positionIndex -
                                                tickets[destinationTicketIndex].positionIndex) / 2);
                                    }
                                }
                            }
                        })
                    }
                })
            } else {
                boardColumns.map(boardColumn => {
                    if (boardColumn.id === sourceParentId) {
                        const oldTickets = boardColumn.tickets;
                        oldTickets.map(thisTicket => {
                            if (thisTicket.id === ticketId) {
                                const ticketPosition = thisTicket.positionIndex;
                                boardColumns.map(boardColumn => {
                                    if (boardColumn.id === destParentId) {
                                        const tickets = boardColumn.tickets;
                                        if (tickets.length === 0) {
                                            newIndex = 1;
                                        } else if (destinationTicketIndex >= tickets.length) {
                                            newIndex = tickets[destinationTicketIndex - 1].positionIndex + 1;
                                        } else {
                                            tickets.map(ticket => {
                                                const index = tickets[destinationTicketIndex].positionIndex;
                                                if (ticket.positionIndex === index) {
                                                    if (ticketPosition >= index) {
                                                        if (destinationTicketIndex == 0) {
                                                            newIndex = tickets[destinationTicketIndex].positionIndex / 2;
                                                        } else {
                                                            newIndex = tickets[destinationTicketIndex - 1].positionIndex +
                                                                ((tickets[destinationTicketIndex].positionIndex -
                                                                    tickets[destinationTicketIndex - 1].positionIndex) / 2);
                                                        }
                                                    } else if (ticketPosition < index) {
                                                        if (destinationTicketIndex == tickets.length - 1) {
                                                            newIndex = tickets[destinationTicketIndex].positionIndex + 1;
                                                        } else {
                                                            newIndex = tickets[destinationTicketIndex].positionIndex +
                                                                ((tickets[destinationTicketIndex + 1].positionIndex -
                                                                    tickets[destinationTicketIndex].positionIndex) / 2);
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
            moveTicket(sourceParentId, destParentId, ticketId, newIndex);
        }
    }

    const list = boardColumns.map(boardColumn => {
        var id = boardColumn.id;
        return <Draggable key={boardColumn.id} draggableId={"column" + id.toString()} index={boardColumns.indexOf(boardColumn)}>
            {(provided) => (
                <li {...provided.draggableProps} {...provided.innerRef}>
                    <BoardColumn boardId={boardId} data={boardColumn}
                        updateBoardColumn={updateBoardColumn}
                        deleteBoardColumn={deleteBoardColumn} toggleUpdateBoardColumnTickets={toggleUpdateBoardColumnTickets}
                        updateBoardColumnTickets={updateBoardColumnTickets} boardColumns={boardColumns}
                        tickets={boardColumn.tickets} innerRef={provided.innerRef} dragHandleProps={provided.dragHandleProps} />
                </li>)}
        </Draggable>
    })

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="columns" type="columns" direction="horizontal">
                {(provided) => (
                    <ul className="default_main" id="defaultMain" {...provided.droppableProps} ref={provided.innerRef}>
                        {list}
                        {provided.placeholder}
                        <li key={0} className="addNewBoardColumn" id="default" ref={provided.innerRef}>
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