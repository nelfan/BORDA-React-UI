import {useState} from 'react'
import * as regExpUtil from '../../../utils/regExpUtil'

const InputToAddBoard = ({onAdd}) => {
    const [boardName, setBoardName] = useState('')
    const [boardNameDirty, setBoardNameDirty] = useState(false)
    const [boardNameError, setBoardNameError] = useState('Board name cannot be empty')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!boardName) {
            alert('Please enter a board name')
            return
        } else if (boardNameError !== '') {
            alert('Invalid board name')
            return;
        }

        onAdd({text: boardName})
        setBoardName('')
    }

    const blurHandler = (e) => {
        if (e.target.name === 'boardName') {
            setBoardNameDirty(true)
        }
    }

    const boardNameHandler = (e) => {
        setBoardName(e.target.value)
        if (e.target.value.trim().length === 0) {
            setBoardNameError('Board name cannot contain only whitespace characters')
        } else if (e.target.value.length > 255) {
            setBoardNameError('Board name cannot be more than 255 characters ')
        } else if (!regExpUtil.BOARD_NAME_REG_EXP.test(String(e.target.value))) {
            setBoardNameError('Board name can contain only english letters')
        } else {
            setBoardNameError('')
        }
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                {(boardNameDirty && boardNameError) && <div style={{color: 'red'}}>{boardNameError}</div>}
                <input className='input-add-board'
                       onBlur={e => blurHandler(e)}
                       name='boardName'
                       type='text'
                       placeholder='Enter board name'
                       value={boardName}
                       onChange={e => boardNameHandler(e)}
                />
                <div>
                    <input type='submit' value='Create Board' className='btn btn-block'/>
                </div>
            </div>
        </form>
    )
}

export default InputToAddBoard