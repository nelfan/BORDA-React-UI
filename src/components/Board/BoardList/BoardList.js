import React, {useEffect, useState} from 'react';
import "./board_list.css"
import BoardListItem from "./BoardListItem/BoardListItem";

function BoardList(props) {

    const boardId = props.boardId
    const [addNewBoardList, setNewBoardList] = useState(false);
    const [boardColor, setBoardColor] = useState('#6aba96');
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        color: boardColor,
        name: '',
        key: ''
    })

    const handleInput = (e) => {
        setCurrentItem({
            color: boardColor,
            name: e.target.value,
            key: Date.now()
        })
    }

    useEffect(() => {
        const getBoardLists = async () => {
            const boardsListsFromServer = await fetchBoardLists()
            setItems(boardsListsFromServer)
        }
        getBoardLists()
    }, [])

    const fetchBoardLists = async () => {
        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    const addItem = async () => {
        const createBoardListData = {
            'name': currentItem.name
        }

        const res = await fetch('http://localhost:9090/boards/' + boardId + '/columns', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(createBoardListData),
        })

        const data = await res.json()

        setItems([...items, data])

        setCurrentItem({
            color: boardColor,
            name: '',
            key: ''
        })
    }

    const changeColor = (e) => {
        setBoardColor(e.target.value)
        document.getElementById("colorPicker").value = boardColor;
    }

    const newBoardList = () => {
        setNewBoardList(!addNewBoardList)
    }

    const cancelAddNewBoardList = () => {
        setNewBoardList(false)
    }

    const deleteItem = (key) => {
        const filteredItems = items.filter(item => item.key !== key);
        setItems(filteredItems);
    }

    const setUpdate = (data, key) => {
        const {name, color} = data

        const filtered = items;
        filtered.map(item => {
            if (item.key === key) {
                item.name = name;
                item.color = color;
            }
        })
        setItems(filtered);
    }

    const list = items.map(item => {
        return <li key={item.key}><BoardListItem boardId={boardId} data={item} setUpdate={setUpdate} deleteItem={deleteItem}/></li>
    })
    return <ul className="default_main" id="defaultMain">
        {list}
        <li className="addNewBoardListItem" id="default">
            <div className="align_btn_add_board">
                <div className="align_add_bord">
                    <form action="#">
                        {addNewBoardList ?
                            <div className="add_board_ok_cancel">
                                <span className="ok_board" onClick={addItem}>Ok</span>
                                <span className="cancel_board" onClick={cancelAddNewBoardList}> Cancel </span>
                            </div> :
                            <div className="add_board" onClick={newBoardList}>
                                <span> Add new Column <i className="fa fa-plus"/> </span>
                            </div>
                        }

                        {addNewBoardList ?
                            <div className="textfield_of_newboard">
                                <div className="align_of_board_content">
                                    <div className="board_title">
                                        <input id="boardList_title" onChange={handleInput} type="text"
                                               placeholder="Enter a column title" autoComplete="off"
                                               value={currentItem.name} required/>
                                    </div>
                                </div>
                            </div> : null}
                    </form>
                </div>
            </div>
        </li>
    </ul>
}

export default BoardList