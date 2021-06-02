import React from 'react'
import  "./header_options.css"

function HeaderOptions () {
    return <div className="right_side" style={{width: "50%",display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end"}}>
            <div className="general_info">
                <a href="#" className="question_icon">
                    <i className="fa fa-question-circle"/>
                </a>
                <a href="#" className="doc_icon">
                    <i className="fas fa-file-alt"/>
                </a>
            </div>
        </div>
}

export default HeaderOptions