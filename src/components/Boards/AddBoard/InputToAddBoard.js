import {useState} from 'react'
import Swal from "sweetalert2";

const InputToAddBoard = ({onAdd}) => {
    const [boardName, setBoardName] = useState('')
    const [boardNameDirty, setBoardNameDirty] = useState(false)
    const [boardNameError, setBoardNameError] = useState('Board name cannot be empty')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!boardName) {
            Swal.fire({
                title: 'Please enter a board name!',
                text: boardNameError,
                icon: 'warning',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#386DD8'
            })
            return
        } else if (boardNameError !== '') {
            Swal.fire({
                title: 'Invalid board name!',
                text: boardNameError,
                icon: 'warning',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#386DD8'
            })
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
        const re = /^[\s~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
        if (e.target.value.trim().length === 0) {
            setBoardNameError('Board name cannot contain only whitespace characters')
        } else if (e.target.value.length > 255) {
            setBoardNameError('Board name cannot be more than 255 characters ')
        } else if (!re.test(String(e.target.value))) {
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