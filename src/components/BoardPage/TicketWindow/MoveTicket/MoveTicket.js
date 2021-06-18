import React, { useEffect, useState } from 'react'

const MoveTicket = (props) => {
    const [items, setItems] = useState([]);

    const list = items.map(item => {
        return <li key={item.id} onClick={() => {
            props.moveTicket(item.id, props.ticketId);
            props.toggleMenu()
            props.refreshColumns()
        }}><span>{item.name}</span></li>
    })

    useEffect(() => {
        const getBoardColumns = async () => {
            const boardsColumnsFromServer = await fetchBoardColumns()
            setItems(boardsColumnsFromServer)
        }
        getBoardColumns()
    }, [])

    const fetchBoardColumns = async () => {
        const res = await fetch('http://localhost:9090/boards/' + props.boardId + '/columns', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    return <div className="task_labels">
        <div className="task_labels_content">
            <div className="add_a_labels_to_task">
                <ul className="list_of_labels">
                    {list}
                </ul>
            </div>
        </div>
    </div>
}

export default MoveTicket
