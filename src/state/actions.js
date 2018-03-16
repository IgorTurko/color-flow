export const CREATE_BOARD = 'CREATE_BOARD';
export const createBoard = (rows, columns, colors) => {
    return {
        type: CREATE_BOARD,
        rows,
        columns,
        colors
    }
}

export const MAKE_TURN = 'MAKE_TURN';
export const makeTurn = (row, column) => {
    return {
        type: MAKE_TURN,
        row,
        column
    }
}