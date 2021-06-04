import React from 'react';
import "./ticket_options.css"

function TicketOptions() {
    return <div className="right_side">
        <div className="add_items_task">
            <span>Add</span>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
            </ul>
        </div>
        <div className="action_items_task">
            <span>Actions</span>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
    </div>
}

export default TicketOptions