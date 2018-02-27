import { CREATE_BOARD, MAKE_MOVE } from './actions';
import { Board, Tile } from '../service';

let board = {};

const defaultState = {
    tiles: [],
    nextMoves: [],
    step: 0
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_BOARD: {
            board = new Board(action.rows, action.columns, action.colors);
            const tile = board.getTile(0, 0);
            tile.setAsVisited();

            return {
                ...state,
                tiles: [...board.getTiles()],
                nextMoves: [...board.nextMoves([tile])]
            }
        }

        case MAKE_MOVE: {  
            const tile = board.getTile(action.row, action.column);
            board.getAreaByColor([...board.getVisited(), tile], tile.color)
                .forEach(x => x.setAsVisited(x));
            
            return {
                ...state,
                step: state.step + 1,                
                tiles: board.getTiles().map(x => {
                    if (x.isVisited()){
                        x.setColor(tile.color);        
                    }

                    return x;
                }),
                nextMoves: [...board.nextMoves(board.getVisited())]
            }
        }

        default:
            return state;
    }
}
