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
    let cachedState = localStorage.getItem('getAllBooks')
    if (!cachedState) {
      getAll().then((apiBooks) => {
        localStorage.setItem('getAllBooks', JSON.stringify(apiBooks))
        this.setState({ apiBooks })
      })
    } else {
      this.setState({ apiBooks: JSON.parse(cachedState) })
    }
    
  }

  changeShelf = (book, shelf) => {
    // update(book, shelf)  //this returns a 403 forbidden error
    // remove current version of book from state
    this.setState((state) => {
      return {apiBooks: state.apiBooks.filter((apiBook) => {
        return apiBook !== book
      })}
    })
    //update shelf and add updated info to state
    book.shelf = shelf
    this.setState((state) => {
      return { apiBooks: [...state.apiBooks, book] } 
      }, () => {
      localStorage.setItem('getAllBooks', JSON.stringify(this.state.apiBooks))
      }
    )
    //last book added via Search is not getting put in the cache. wtf??? 
    //set as localStorage doesn't seem to work wtf???
  }


  render() {
    const apiBooks = this.state.apiBooks
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
          <Search 
            categorizedBooks={categorizedBooks}
            onChangeShelf={this.changeShelf}
          />
        )}/>          
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf) => {
                  const group = categorizedBooks.filter((book) => book.shelf === shelf)
                  return <BooksView
                    group={group}
                    shelf={shelf}
                    key={shelf}
                    onChangeShelf={this.changeShelf}
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
