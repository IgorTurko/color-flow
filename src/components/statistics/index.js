import * as React from 'react';
import './statistics.css';

export default ({step, limit}) => (
    <div className="statistics">
        {`${step} / ${limit}`}
    </div>
);