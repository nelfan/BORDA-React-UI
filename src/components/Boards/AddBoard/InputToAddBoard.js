import {useState} from 'react'

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
            alert('Board name cannot be more than 255 characters')
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
        if (e.target.value.length > 255) {
            setBoardNameError('Board name cannot be more than 255 characters ')
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