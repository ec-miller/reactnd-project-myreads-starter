import React from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI.js'
import Book from './Book.js'

class Search extends React.Component {
  state = {
    searchTerm: '',
    searchResults: []
  }

  updateSearch = (search) => {
    this.setState({ searchTerm: search})
  }

  getSearch = () => {
    search(this.state.searchTerm).then((searchResults) => {
      this.setState({ searchResults })
    })
  }

  render() {
    const searchResults = this.state.searchResults
    const searchTerm = this.state.searchTerm

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" 
              onChange={ (event) => {
                this.updateSearch(event.target.value) 
                this.getSearch()
                }
              }
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { searchTerm.length > 0 && searchResults && !('error' in searchResults) && (
              searchResults.map((item) => {
                return <Book 
                  key={item.id}
                  item={item}
                />
              })
              // <Book />
              
              ) }
            
          </ol>
        </div>
      </div>
    )
  }
}

export default Search