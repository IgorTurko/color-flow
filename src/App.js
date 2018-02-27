import React, { PureComponent } from 'react';
import logo from './logo.svg';
import Board from './components/board';
import './App.css';

export default class extends PureComponent {
  render() {
    return (
      <div className="App">
        <Board colors={6} rows={6} columns={6} cellSize={5} />
      </div>
    );
  }
}