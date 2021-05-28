import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import ButtonToAddBoard from "./ButtonToAddBoard";

const AddBoard = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <div className='add-board'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <ButtonToAddBoard
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'}
                    onClick={onAdd}
                />
            )}
        </div>
    )
}

AddBoard.defaultProps = {
    title: 'Create new board',
}

AddBoard.propTypes = {
    title: PropTypes.string.isRequired,
}

export default AddBoard