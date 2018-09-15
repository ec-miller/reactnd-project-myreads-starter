import React from 'react'
import Book from './Book.js'

class BooksView extends React.Component {
  render() {
    let { shelf, group } = this.props

    shelf = shelf[0].toUpperCase() + shelf.substr(1).replace(/([A-Z])/g, ' $1')
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {group.map((item) => {
              return <Book
                key={item.id}
                item={item}
              />
              })
            }
          </ol>
        </div>
      </div>
          
    )
  }
}

export default BooksView