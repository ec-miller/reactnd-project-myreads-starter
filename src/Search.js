import React from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI.js'
import Book from './Book.js'

class Search extends React.Component {
  state = {
    searchTerm: '',
    searchResults: []
  }

  getSearch = () => {
    console.log(this.state.searchTerm)
      search(this.state.searchTerm).then((searchResults) => {
        this.setState({ searchResults })
        // console.log({searchResults})
      })
  }

  updateSearch = (searchTerm) => {
    console.log(searchTerm)
    this.setState({ searchTerm }, () => {
      this.getSearch()
    })
  }

  compareSearchAndShelves = (searchResults,catBooks) => {
    let finalResults = []
    let idArray = []
    searchResults.forEach((searchBook) => {
      catBooks.forEach((catBook) => {
        if (searchBook.id === catBook.id) { 
          finalResults.push(catBook)
        } 
      })
    finalResults.forEach((finBook) => {
      idArray.push(finBook.id) 
    })
    if (idArray.indexOf(searchBook.id) === -1) {
      finalResults.push(searchBook)
    }
    } )
    // console.log(finalResults)

    return finalResults
  }

  render() {
    const searchResults = this.state.searchResults
    const searchTerm = this.state.searchTerm
    const { categorizedBooks, onChangeShelf }=this.props
    let finalSearch = []

    if (searchTerm.length > 0 && searchResults && !('error' in searchResults)) {
      finalSearch = this.compareSearchAndShelves(searchResults, categorizedBooks)
      // console.log(finalSearch)
    }
  
    const acceptableTerms = [
      'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ]
    const regex1 = RegExp(searchTerm)
    const goodSearch = () => {
      for (let aTerm of acceptableTerms) {
        if (regex1.test(aTerm)) {
          return true
        } 
      }
      return false
    }

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
            <input type="text" placeholder="Search by title or author" value={searchTerm}
              onChange={ (event) => {
                this.updateSearch(event.target.value) 
                  // this.getSearch()
                }
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          { !goodSearch() ? 
          <div>
          <p>Sorry, that is not a valid search term. Please try one of the options below!</p>
          {acceptableTerms.map((term) => {
            return <li key={term}>{term}</li>
          }) }
          </div>
          :
          <ol className="books-grid">
            { searchTerm.length > 0 && finalSearch && (
              finalSearch.map((item) => {
                return <Book 
                key={item.id}
                item={item}
                onChangeShelf={onChangeShelf}
                />
              }) 
            )}
          </ol>    
          } 
          
            
          
        </div>
      </div>
    )
  }
}

export default Search