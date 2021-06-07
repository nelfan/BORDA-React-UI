import React, { useState } from 'react';
import defaultIMG from "../../../assets/images/default-user.jpg";
import "./ticket.css"
import Member from "./Member/Member";
import Tag from "./Tag/Tag";
import Comment from "./Comment/Comment";
import TicketWindowOptions from "./TicketWindowOptions/TicketWindowOptions";
import serialize from 'form-serialize';

function TicketCreate(props) {

    const boardId = props.boardId
    const columnId = props.columnId

    const background = React.createRef();
    const [membersList, setMembersList] = useState([]);
    const [tagsList, settagsList] = useState([]);
    const [membersCounter, setMemberCounter] = useState(0);
    const [newTagMenu, setNewTagMenu] = useState(false);
    const [addMemberMenu, setAddMemberMenu] = useState(false);
    const [currentTicket, setCurrentTicket] = useState({
        title: '',
        members: [],
        tags: [],
        description: ''
    });

    const [member, setMember] = useState({ icon: '', name: '' });
    const [tag, settag] = useState({ color: '', name: '' });

    const addNewTag = () => {
        setNewTagMenu(!newTagMenu);
    }

    const showUsersMenu = () => {
        setAddMemberMenu(!addMemberMenu);
    }

    const changeTicketBackground = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            document.getElementById("ticketBackground").src = reader.result
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const uploadTicketBg = () => {
        document.getElementById("ticketBg").click();
    }

    const createTicket = async (e) => {
        e.preventDefault();
        const { task_title, description } = serialize(document.querySelector("#taskWindow"), { hash: true });
        
        const createTicketData = {
            title: task_title,
            description: description,
            members: membersList,
            tags: tagsList
        }

        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns/' + columnId + '/tickets/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(createTicketData),
        })

        const data = await res.json()

        props.ticket({
            id: data.id,
            title: data.title,
            description: data.description,
            members: data.members,
            tags: data.tags
        });
        props.cancelBtn();
    }

    const addMember = (e) => {
        setAddMemberMenu(!addMemberMenu);
        setMembersList([...membersList, {
            icon: e.currentTarget.querySelector('.member_avatar img').src,
            name: e.currentTarget.querySelector('.member_name span').innerText
        }])
    }

    const addtag = (e) => {
        setNewTagMenu(!newTagMenu);
        settagsList([...tagsList, {
            color: e.currentTarget.querySelector('.tag_value span').style.background,
            name: e.currentTarget.querySelector('.tag_name span').innerText
        }])
    }

    return <div className="align_addNewTask_window">
        <div className="add_new_task_toBoard">
            <div className="header_align_new">
                <div className="header_row_addNew">
                    <span>Task</span>
                    <i className="fa fa-times" onClick={props.cancelBtn} />
                </div>
            </div>

            <div className="align_task_w_content">
                <form action="#" className="task_window_content" id="taskWindow">
                    <div className="general_inf_task">
                        <div className="left_side">
                            <div className="align_left_side">
                                <div className="align_task_title_field">
                                    <div className="task_title_field">
                                        <div className="title_ff">
                                            <i className="fa fa-clipboard header_tit" />
                                            <span>Title</span>
                                        </div>
                                        <div className="align_textfield_of_task_title">
                                            <div className="textfield_of_taks_title">
                                                <input type="text" name="task_title" placeholder="Enter title of task"
                                                    autoComplete="off" required />
                                                <i className="fa fa-check icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="align_task_details">
                                    <div className="task_details">
                                        <Member counter={membersCounter} showUsersMenu={showUsersMenu}
                                            clickAddMember={addMember} isOpen={addMemberMenu}
                                            data={membersList} />
                                        <Tag addNewTag={addNewTag} clickAddtag={addtag}
                                            isOpen={newTagMenu} data={tagsList} />
                                    </div>
                                </div>

                                <div className="align_task_description_field">
                                    <div className="task_description_field">
                                        <div className="task_description_title">
                                            <span>Description</span>
                                            <i className="fa fa-edit" />
                                        </div>
                                        <div className="task_desc_area">
                                            <textarea name="description" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input ref={background} id="ticketBg" className="bg_input" name="bg" style={{ display: "none" }}
                        onChange={changeTicketBackground} type="file" required />
                    <div className="align_addTask_btn">
                        <div className="addTask_btn">
                            <input type="submit" onClick={(e) => createTicket(e)} value="Add" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default TicketCreate