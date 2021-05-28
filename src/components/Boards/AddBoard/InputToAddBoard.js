import { useState } from 'react'

const InputToAddBoard = ({ onAdd }) => {
    const [boardName, setBoardName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!boardName) {
            alert('Please enter a board name')
            return
        }

        onAdd({ text: boardName})

        setBoardName('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <input
                    type='text'
                    placeholder='Board name'
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                />
            </div>

            <input type='submit' value='Create Board' className='btn btn-block' />
        </form>
    )
}

export default InputToAddBoard