import React, {useState} from 'react';
import "./board_list.css"

function BoardList() {
    const [addNewBoardList, setNewBoardList] = useState(false);
    const [boardColor, setBoardColor] = useState('#6aba96');
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        color: '',
        title: '',
        key: ''
    })

    const handleInput = (e) => {
        setCurrentItem({
            color: boardColor,
            title: e.target.value,
            key: Date.now()
        })
    }

    const addItem = (e) => {
        e.preventDefault();
        const data = [...items, currentItem];
        setItems(data);
        setCurrentItem({
            color: '',
            title: '',
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

    return <ul className="default_main" id="defaultMain">
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
                                <span> Add new Board <i className="fa fa-plus"/> </span>
                            </div>
                        }

                        {addNewBoardList ?
                            <div className="textfield_of_newboard">
                                <div className="align_of_board_content">
                                    <div className="board_title">
                                        <input id="boardList_title" onChange={handleInput} type="text"
                                               placeholder="Enter a board title" autoComplete="off"
                                               value={currentItem.title} required/>
                                    </div>

                                    <div className="picker">
                                        <input type="color" className="colorpicker" id="colorPicker"
                                               onChange={changeColor} name="color"
                                               pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                                               value={boardColor} required/>
                                        <input type="text" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                                               onChange={changeColor} value={boardColor}
                                               className="hexcolor" id="hexColor"/>
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