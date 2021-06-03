import React from 'react';
import "./board_page.css"

function BoardPage(props) {
        const boardId = props.location.state;
        return <div className="content">
            <div className="alignment_of_header">
                <div className="header">

                </div>
            </div>
            <div className="main_content">
                <div className="active_borda_items">

                </div>
            </div>
        </div>
}

export default BoardPage