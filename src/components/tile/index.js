import React from 'react';

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
        const { color, size, isVisited } = this.props;
        const unit = toScalableUnits(size);

        return <div className={"tile" + (isVisited ? " not-visited": "")}
            onClick={() => this.onMakeTurn()} 
            style={{width: unit, height: unit}}>
                <div className="figure" 
                    style={{background: `radial-gradient(circle at 33% 33%, ${color}, #000)`}}>
                </div>
        </div>;
    }
}