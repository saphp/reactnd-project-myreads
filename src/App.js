import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchPage} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} />
                <BookShelf title="Want to Read" books={this.state.books.filter((book) => book.shelf === 'wantToRead')} />
                <BookShelf title="Read" books={this.state.books.filter((book) => book.shelf === 'read')} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
