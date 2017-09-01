import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'

class BookItem extends Component {
	handleChange = (e) => {
		this.props.handleUpdate(this.props.book, e.target.value)
	}

	render() {
		const book = this.props.book
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
						<div className="book-shelf-changer">
							<ShelfChanger value={book.shelf} onChange={this.handleChange} />
						</div>
					</div>
					<div className="book-title">{ book.title }</div>
					<div className="book-authors">{ book.authors.map((author, index) => <span key={index}>{index > 0 && <i>, </i>}{author}</span>)}</div>
				</div>
			</li>
		)
	}
}

export default BookItem