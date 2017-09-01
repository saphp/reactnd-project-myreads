import React, { Component } from 'react'
import BookItem from './BookItem'

class BookShelf extends Component {
	render() {
		const books = this.props.books
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{ this.props.title }</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{ books.map((book) => (
							<BookItem book={book} key={book.id} handleUpdate={this.props.handleUpdate} />
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookShelf