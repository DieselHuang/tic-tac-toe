import React, {Component} from 'react';
import Square from './Square'

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square 
				key={i}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
				background={this.props.line.indexOf(i)===-1? 'white': 'red'}
			/>
		);
	}
	
	render() {
		let rows = [];
		let cells = [];
		for(let m=0; m<3; m++) {
			for(let n=0; n<3; n++) {
				cells.push(this.renderSquare(3 * m + n));
			}
			rows.push(<div key={m} className="board-row">{cells}</div>);
			cells = [];
		}
		return (
			<div>
				{rows}
			</div>
		);
	}
}

export default Board;