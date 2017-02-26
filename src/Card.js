import React, { Component } from 'react';

export default class Card extends Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	render() {
		var divStyle = {
			backgroundImage: "url(" + this.props.card.image  + ")",
			display: this.props.card.visible ? "inline-block" : "none"
			// border:"1px solid black"
		};

		if(!this.props.card.visible) {
			return null;
		}

		return (
			<div onClick={this.props.onClick.bind(this, this.props.index)} className="kitten-card" style={this.props.card.selected ? divStyle: null}>

			</div>
		);
	}
}
