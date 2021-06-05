import React from 'react';
import "./comments.css"

function Comment() {
    return <div className="align_chat_field">
        <div className="chat_field">
            <div className="task_chat_title">
                <span>Chat</span>
                <i className="fa fa-comment"/>
            </div>
            <div className="task_chat_area">
            </div>
        </div>
    </div>
}

export default Comment