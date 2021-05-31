import './boardView.css';
import { Link } from 'react-router-dom';

const BoardView = ({ boardView, onDelete }) => {

    return (
        <div className="boards-info">
            <Link
                to={{ pathname: '/board', state: { id: boardView.id } }}><div className="board-name">
                    {boardView.name}
                </div>
            </Link>
        </div>
    )
}

export default BoardView
