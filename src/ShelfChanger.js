import React, { Component } from 'react'

class ShelfChanger extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
		this.props.onChange(e)
	}

	render() {
		return (
			<select value={this.state.value} onChange={this.handleChange}>
				<option value="" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		)
	}
}

export default ShelfChanger