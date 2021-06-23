import React, { useEffect, useState } from 'react'

const MoveTicket = (props) => {
    const [items, setItems] = useState([]);

    const list = items.map(item => {
        return <li key={item.id} onClick={() => {
            props.moveTicket(item.id, props.ticketId);
            props.toggleMenu()
        }}><span>{item.name}</span></li>
    })

    useEffect(() => {
        const getBoardColumns = async () => {
            setItems(props.boardColumns)
        }
        getBoardColumns()
    }, [props.boardColumns])

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
