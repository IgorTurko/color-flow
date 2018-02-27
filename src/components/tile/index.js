import React, { PureComponent } from 'react';

import { toScalableUnits } from '../../helpers';

import './tile.css';

export default class Tile extends React.PureComponent {
    onMakeTurn() {
        const { makeTurn } = this.props;

        if (makeTurn) {
            makeTurn();
        }
        
    }

    render() {
        const { color, size } = this.props;
        const unit = toScalableUnits(size);

        return <div className="tile"
            onClick={() => this.onMakeTurn()} 
            style={{backgroundColor: color, width: unit, height: unit}}>
        </div>;
    }
}