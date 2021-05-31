import React from 'react'

const Board = (props) => {

    const {id} = props.location.state

    return (
        <div>
            Board with id: {id}
        </div>
    )
}

export default Board
