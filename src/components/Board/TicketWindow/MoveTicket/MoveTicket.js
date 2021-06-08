import React, { useEffect, useState } from 'react'

const MoveTicket = (props) => {
    const [items, setItems] = useState([]);

    const list = items.map(item => {
        return <li key={item.id} onClick={() => { props.moveTicket(item.id, props.ticketId) }}><span>{item.name}</span></li>
    })

    useEffect(() => {
        const getBoardLists = async () => {
            const boardsListsFromServer = await fetchBoardLists()
            setItems(boardsListsFromServer)
        }
        getBoardLists()
    }, [])

    const fetchBoardLists = async () => {
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
