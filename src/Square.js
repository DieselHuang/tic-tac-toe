import React, {Component} from 'react';

class Square extends Component {
	render() {
		return (
			<button className="square" onClick={this.props.onClick} style={{background: this.props.background}}>
				{this.props.value}
			</button>
		);
	}
}

export default Square;