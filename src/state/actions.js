export const CREATE_BOARD = 'CREATE_BOARD';
export const createBoard = (rows, columns, colors) => {
    return {
        type: CREATE_BOARD,
        rows,
        columns,
        colors
    }
}

export const MAKE_MOVE = 'MAKE_MOVE';
export const makeMove = (row, column) => {
    return {
        type: MAKE_MOVE,
        row,
        column
    }
}