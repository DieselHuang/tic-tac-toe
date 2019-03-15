import React, { Component } from 'react';
import Board from './Board'
import './index.css';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: false,
      location: [0, 0]
    }
  }
    
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let location = this.state.location;
    
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'O': 'X';
    location = getLocation(i);
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      location: location,
      reverse: false
    });
  }
    
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2 === 0)
    })
  }
  
  reverseHistory() {
    this.setState({
      reverse: !this.state.reverse
    })
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    const winner = result===null? null: result.winner;
    const line = result===null? []: result.line;
    
    const moves = history.map((step, move) => {
      const desc = move? 'Go to move #' + move: 'Go to game start';
      return (
        <li key = {move} className={"lists"}>
          <button onClick = {() => this.jumpTo(move)} style={{fontWeight: this.state.stepNumber===move? 'bold': 'normal', fontSize: "15px"}}>{desc}</button>
        </li>
      )
    })
    
    let status;
    let flag = false;
    if(winner) {
      flag = true;
      status = 'Winner: ' + winner;
    } else if(current.squares.indexOf(null)!==-1){
      status = 'Next player: ' + (this.state.xIsNext? 'O': 'X');
    } else {
      status = 'The result is a draw.'
      flag = true;
    }
    
    let location = 'Location: (' + this.state.location[0]+ ', ' + this.state.location[1] + ')';
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            line = {line}
          />
        </div>
        <div className="game-info">
          <div style={{fontSize: flag? "25px": "18px", color: flag? "red": "black"}}>{status}</div>
          <div style={{fontSize: "18px"}}>{location}</div>
          <div className="toggle-btn">
            <button style={{fontSize: "16px"}} onClick={() => this.reverseHistory()}>Toggle the history order</button>
          </div>
          <ol>{this.state.reverse? moves.reverse(): moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}

function getLocation(i) {
  const locations = [
    [1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3]
  ]
  return locations[i];
} 

export default TicTacToe;