import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { getAll } from './BooksAPI.js'
import Search from './Search.js'
import BooksView from './BooksView.js'

// will go to the BooksView
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    apiBooks: []
  }

  componentDidMount() {
    getAll().then((apiBooks) => {
      this.setState({ apiBooks })
    })
  }

  render() {
    const apiBooks = this.state.apiBooks
    console.log(apiBooks)
    const shelves = ['currentlyReading','wantToRead','read']

    let categorizedBooks
    if (apiBooks) {
      categorizedBooks = apiBooks
    } else {
      categorizedBooks = []
    }

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search />
        )}/>          
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">>
              <div>
                {shelves.map((shelf) => {
                  const group = categorizedBooks.filter((book) => book.shelf === shelf)
                  console.log(group)
                  return <BooksView
                    group={group}
                    shelf={shelf}
                    key={shelf}
                    />
                  }
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to='search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
