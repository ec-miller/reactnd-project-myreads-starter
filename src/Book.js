import React from 'react'

class Book extends React.Component {
  render() {
    const { item } = this.props


    const shelfChoice = (('shelf' in item) ? item.shelf : 'none')
    

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={shelfChoice}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{item.title}</div>
            <div className="book-authors">{item.author}</div>
        </div>
      </li>
    )
  }
}

export default Book