import React from 'react';
import { connect } from 'react-redux';
import Tile from '../tile';
import Statistics from '../statistics';
import { hexColors } from '../../configuration';
import { toScalableUnits } from '../../helpers';
import { createBoard, makeTurn } from '../../state/actions';
import './board.css';

class BoardComponent extends React.PureComponent {    
    
    componentDidMount() {
        const { createBoard, rows, columns, colors } = this.props;
        
        createBoard(rows, columns, colors);
    }

    render() {
        const { columns, cellSize, tiles, step, limit, nextMoves, makeTurn } = this.props;
        const width = toScalableUnits(cellSize * columns);
        const defaultColor = '#000000';

        return (
            <div className="board-wrapper" style={{width: width}}>
                <Statistics step={step} limit={limit} />
                <div className="board">
                    {
                        tiles.map((tile, i) => {
                            const color = hexColors[tile.color] || defaultColor;
                            const availableForClick = nextMoves.findIndex(x => x.row === tile.row && x.column === tile.column) > -1;

                            return <Tile key={i} 
                                color={color}
                                size={cellSize}
                                isVisited={tile.visited}
                                makeTurn={availableForClick ? () => makeTurn(tile.row, tile.column): null} />
                        }
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            ...state
        }
    },
    {
        createBoard: createBoard,
        makeTurn: makeTurn
    }
)(BoardComponent);