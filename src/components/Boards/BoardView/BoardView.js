 import './boardView.css';

 const BoardView = ({boardView, onDelete}) => {

    return (
    <div className="boards-info">
        <a href={boardView.id}>
            <div className="board-name">
                {boardView.name}
            </div>
        </a>
    </div>
    )
}

export default BoardView
