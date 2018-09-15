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
    categorizedBooks: []
  }

  componentDidMount() {
    getAll().then((categorizedBooks) => {
      console.log(categorizedBooks)
      this.setState({ categorizedBooks })
    })
  }

  render() {
    const categorizedBooks = this.setState.categorizedBooks

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
            <BooksView 
            categorizedBooks={categorizedBooks}
            />
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
