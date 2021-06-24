import React, {useEffect, useState} from 'react';
import "./ticket.css"
import Member from "./Member/Member";
import Tag from "./Tag/Tag";
import serialize from 'form-serialize';
import Swal from "sweetalert2";

function TicketCreate(props) {

    const boardId = props.boardId
    const columnId = props.columnId

    const [members, setMembers] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsList, settagsList] = useState([]);
    const [membersCounter, setMemberCounter] = useState(0);
    const [newTagMenu, setNewTagMenu] = useState(false);
    const [addMemberMenu, setAddMemberMenu] = useState(false);
    const [taskTitleDirty, setTaskTitleDirty] = useState(false);
    const [taskTitleError, setTaskTitleError] = useState('Title cannot be empty')

    useEffect(() => {
        const getTags = async () => {
            const tagsFromServer = await fetchTags()
            setTags(tagsFromServer)
        }
        getTags()
        const getMembers = async () => {
            const membersFromServer = await fetchMembers()
            setMembers(membersFromServer)
        }
        getMembers()
    }, [])

    const addNewTag = () => {
        setNewTagMenu(!newTagMenu);
    }

    const showUsersMenu = () => {
        setAddMemberMenu(!addMemberMenu);
    }

    const createTicket = async (e) => {
        e.preventDefault();
        const {task_title, description} = serialize(document.querySelector("#taskWindow"), {hash: true});

        const createTicketData = {
            title: task_title,
            description: description,
            members: membersList,
            tags: tagsList
        }

        if (taskTitleError !== '') {
            Swal.fire({
                title: 'Invalid task title',
                text: taskTitleError,
                icon: 'warning',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#386DD8',
                position: "bottom"
            })
        } else {
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
    }

    const fetchTags = async () => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/tags/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    const fetchMembers = async () => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/users/roles/' + 1, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        const owners = await res.json()

        const res2 = await fetch('http://localhost:9090/boards/' + boardId + '/users/roles/' + 2, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })

        const collaborators = await res2.json()

        return [...owners, ...collaborators]
    }

    const addMember = (e, userId) => {
        if (!membersList.some(item => item.id === userId)) {
            setMembersList([...membersList, members.find(item => item.id === userId)])
        } else {
            setMembersList(membersList.filter(item => item.id !== userId))
        }
        setAddMemberMenu(!addMemberMenu);
    }

    const addTag = (e, tagId) => {
        if (!tagsList.some(item => item.id === tagId)) {
            settagsList([...tagsList, tags.find(item => item.id === tagId)])
        } else {
            settagsList(tagsList.filter(item => item.id !== tagId))
        }
        setNewTagMenu(!newTagMenu);
    }

    const handleInput = (e) => {
        taskTitleHandler(e.target.value)
    }

    const blurHandler = (e) => {
        if (e.target.name === 'task_title') {
            setTaskTitleDirty(true)
        }
    }

    const taskTitleHandler = async (e) => {
        const re = /^[\s~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
        if (e === '') {
            setTaskTitleError('Title cannot be empty')
        } else if (e.length > 25) {
            setTaskTitleError('Title cannot be more than 25 characters')
        } else if (e.trim().length === 0) {
            setTaskTitleError('Title cannot contain only whitespace characters')
        } else if (!re.test(String(e))) {
            setTaskTitleError('Title can contain only english letters')
        } else {
            setTaskTitleError('')
        }
    }

    return <div className="align_addNewTask_window">
        <div className="add_new_task_toBoard">
            <div className="header_align_new">
                <div className="header_row_addNew">
                    <span>Task</span>
                    <i className="fa fa-times" onClick={props.cancelBtn}/>
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
                                                <input onBlur={e => {
                                                    blurHandler(e)
                                                }} onChange={handleInput} type="text" name="task_title"
                                                       placeholder="Enter title of task"
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
                                                data={membersList} boardMembers={members}/>
                                        <Tag addNewTag={addNewTag} clickAddLabel={addTag}
                                             isOpen={newTagMenu} data={tagsList} boardTags={tags}/>
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
                            </div>
                        </div>
                    </div>

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

export default TicketCreate