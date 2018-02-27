import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Tile from '../tile';
import { hexColors } from '../../configuration';
import { toScalableUnits } from '../../helpers';
import { createBoard, makeMove } from '../../state/actions';
import './board.css';

class BoardComponent extends React.PureComponent {    
    
    componentDidMount() {
        const { createBoard, makeMove, rows, columns, colors } = this.props;
        
        createBoard(rows, columns, colors);
    }

    render() {
        const { columns, cellSize, tiles, nextMoves, makeMove } = this.props;
        const width = toScalableUnits(cellSize * columns);
        const defaultColor = '#000000';

        return ( 
            <div className="field" style={{width: width}}>
                {
                    tiles.map((tile, i) => {
                        const color = hexColors[tile.color] || defaultColor;
                        const availableForClick = nextMoves.findIndex(x => x.row == tile.row && x.column == tile.column) > -1;

                        return <Tile key={i} 
                            color={color}
                            size={cellSize}
                            makeTurn={availableForClick ? () => makeMove(tile.row, tile.column): null} />
                    }
                )}
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
        makeMove: makeMove
    }
)(BoardComponent);