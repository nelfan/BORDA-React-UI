import React, {useState} from 'react';
import defaultIMG from "../../../assets/images/default-user.jpg";
import "./ticket.css"
import Member from "./Member/Member";
import Tag from "./Tag/Tag";
import Comment from "./Comment/Comment";
import TicketWindowOptions from "./TicketWindowOptions/TicketWindowOptions";
import serialize from 'form-serialize';

function TicketWindow(props) {
    const background = React.createRef();
    const [membersList, setMembersList] = useState([]);
    const [labelsList, setLabelsList] = useState([]);
    const [membersCounter, setMemberCounter] = useState(0);
    const [newTagMenu, setNewTagMenu] = useState(false);
    const [addMemberMenu, setAddMemberMenu] = useState(false);
    const [currentTicket, setCurrentTicket] = useState({
        bg: null,
        title: '',
        members: [],
        labels: [],
        description: '',
        date: ''
    });

    const [member, setMember] = useState({icon: '', name: ''});
    const [label, setLabel] = useState({color: '', name: ''});

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

    const createTicket = (e) => {
        e.preventDefault();
        const {created, task_title, description} = serialize(document.querySelector("#taskWindow"), {hash: true});

        props.ticket({
            bg: document.getElementById("ticketBackground").src,
            title: task_title,
            members: membersList,
            labels: labelsList,
            description: description,
            date: created
        });
    }

    const addMember = (e) => {
        setAddMemberMenu(!addMemberMenu);
        setMembersList([...membersList, {
            icon: e.currentTarget.querySelector('.member_avatar img').src,
            name: e.currentTarget.querySelector('.member_name span').innerText
        }])
    }

    const addLabel = (e) => {
        setNewTagMenu(!newTagMenu);
        setLabelsList([...labelsList, {
            color: e.currentTarget.querySelector('.label_value span').style.background,
            name: e.currentTarget.querySelector('.label_name span').innerText
        }])
    }

    return <div className="align_addNewTask_window">
        <div className="add_new_task_toBoard">
            <div className="header_align_new">
                <div className="header_row_addNew">
                    <span>Task</span>
                    <i className="fa fa-times" onClick={props.cancelBtn}/>
                </div>
            </div>
            <div className="align_bg_of_task">
                <div className="bg_of_task">
                    <img id="ticketBackground"
                         src={currentTicket.bg !== null ? currentTicket.bg : defaultIMG}
                         alt={defaultIMG}/>
                    <div className="change_bg_of_task">
                        <a href="#" onClick={uploadTicketBg}>Change</a>
                    </div>
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
                                            <i className="fa fa-clipboard header_tit"/>
                                            <span>Title</span>
                                        </div>
                                        <div className="align_textfield_of_task_title">
                                            <div className="textfield_of_taks_title">
                                                <input type="text" name="task_title" placeholder="Enter title of task"
                                                       autoComplete="off" required/>
                                                <i className="fa fa-check icon"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="align_task_details">
                                    <div className="task_details">
                                        <Member counter={membersCounter} showUsersMenu={showUsersMenu}
                                                clickAddMember={addMember} isOpen={addMemberMenu}
                                                data={membersList}/>
                                        <Tag addNewTag={addNewTag} clickAddLabel={addLabel}
                                             isOpen={newTagMenu} data={labelsList}/>
                                        <div className="task_due_date">
                                            <div className="task_date_tit">
                                                <i className="fa fa-clock"/>
                                                <span>Due Date</span>
                                            </div>
                                            <div className="task_date_content">
                                                <input type="date" name="created" required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="align_task_description_field">
                                    <div className="task_description_field">
                                        <div className="task_description_title">
                                            <span>Description</span>
                                            <i className="fa fa-edit"/>
                                        </div>
                                        <div className="task_desc_area">
                                            <textarea name="description"/>
                                        </div>
                                    </div>
                                </div>
                                <Comment/>
                            </div>
                        </div>
                        <TicketWindowOptions/>
                    </div>

                    <input ref={background} id="ticketBg" className="bg_input" name="bg" style={{display: "none"}}
                           onChange={changeTicketBackground} type="file" required/>
                    <div className="align_addTask_btn">
                        <div className="addTask_btn">
                            <input type="submit" onClick={(e) => createTicket(e)} value="Add"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default TicketWindow