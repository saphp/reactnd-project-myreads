import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

class SearchPage extends Component {
	state = {
		query: '',
		books: [],
		no_result: false
	}

	updateQuery(query) {
		this.setState({ query: query.trim() })
		BooksAPI.search(query, 15).then((books) => {
			if (books.error) {
				this.setState({ books: [], no_result: true })
			} else {
				this.setState({ books, no_result: false })
			}
		})
	}
	render() {
		const { query, books } = this.state
		return (
			<div>
				<div className="search-books">
					<div className="search-books-bar">
						<Link className="close-search" to="/">Close</Link>
						<div className="search-books-input-wrapper">
							<input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)} />
						</div>
					</div>
					<div className="search-books-results">
						{ this.state.no_result && <div>No result</div>}
						{ this.state.no_result === false && <ol className="books-grid">
							{ books.map((book) => (
								<BookItem book={book} key={book.id} {...this.props} />
							))}
						</ol> }
					</div>
				</div>
			</div>
		)
	}
}

export default SearchPage