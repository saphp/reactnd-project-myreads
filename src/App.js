import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    this.updateList()
  }
  updateList() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  handleUpdate(book, newShelf) {
    if (!book.shelf || book.shelf === 'none') {
      book.shelf = newShelf
      this.setState((prevState) => {
        return { books: prevState.books.concat(book) };
      })
    } else {
      if (newShelf === 'none') {
        this.setState((prevState) => {
          return { books: prevState.books.filter((b) => b.id !== book.id) };
        });
      } else {
        this.setState((prevState) => {
          return { books: prevState.books.map((b) => {
            if (b.id === book.id) {
              b.shelf = newShelf
            }
            return b
          }) };
        });
      }
    }
    BooksAPI.update(book, newShelf);
  }
  render() {
    const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const read = this.state.books.filter((book) => book.shelf === 'read')
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage handleUpdate={this.handleUpdate} books={this.state.books} />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books={currentlyReading} handleUpdate={this.handleUpdate} />
                <BookShelf title="Want to Read" books={wantToRead} handleUpdate={this.handleUpdate} />
                <BookShelf title="Read" books={read} handleUpdate={this.handleUpdate} />
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
