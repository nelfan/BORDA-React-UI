import ButtonToAddBoard from "./ButtonToAddBoard";

const AddBoard = ({onAdd, showAdd }) => {
    return (
        <div className='add-board'>
                <ButtonToAddBoard
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Create new board'}
                    onClick={onAdd}
                />
        </div>
    )
}

export default AddBoard