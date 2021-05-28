import PropTypes from 'prop-types'
import './buttonToAddBoard.css';
import './InputToAddBoard'

const ButtonToAddBoard = ({ color, text, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className='btn'
        >
            {text}
        </button>
    )
}

ButtonToAddBoard.defaultProps = {
    color: 'steelblue',
}

ButtonToAddBoard.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default ButtonToAddBoard