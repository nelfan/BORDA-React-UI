import React from 'react';
import "./tags.css"

function Tag(props) {
    const list = props.data && props.data.map(item => {
        return <li key={item.name}><p style={{background: item.color}}/><span>{item.name}</span></li>
    })
    return <div className="task_labels">
        <div className="task_labels_tit">
            <i className="fa fa-tag"/>
            <span>Labels</span>
        </div>
        <div className="task_labels_content">
            <ul className="task_labels_ul">
                {props.addNewTag ? list : <span> No Labels </span>}
            </ul>
            <div className="add_a_labels_to_task">
                <i className="fa fa-plus-square" onClick={props.addNewTag}/>
                {props.isOpen ? <ul className="list_of_labels">
                    <li key={1} onClick={props.clickAddLabel}>
                        <div className="user_info_task_labels">
                            <div className="label_name">
                                <span>Task</span>
                            </div>
                            <div className="label_value">
                                <span style={{background: "rgb(86, 121, 236)"}}/>
                            </div>
                        </div>
                    </li>
                </ul> : null}
            </div>
        </div>
        <ul style={{display: "none"}} className="display_task_labels">
            <div className="triangle triangle-4"/>
        </ul>
    </div>
}

export default Tag