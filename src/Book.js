import React from 'react'

class Book extends React.Component {
  render() {
    const { item, onChangeShelf } = this.props

    const shelfChoice = (('shelf' in item) ? item.shelf : 'none')

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <a href={item.infoLink} target='_blank'>
            { ('imageLinks' in item) ? 
            <div className="book-cover" 
              style={{ width: 128, height: 188, backgroundImage: `url(${item.imageLinks.thumbnail})` }}
              // onClick={}
            ></div> : <div className="book-cover"></div> }
            </a>
            <div className="book-shelf-changer">
              <select value={shelfChoice} onChange={(event) => onChangeShelf(item,event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{item.title}</div>
          { ('authors' in item) && item.authors.map((author) => {
            return <div className="book-authors" key={author}>{author}</div>
          })}
              
        </div>
      </li>
    )
  }
}

export default Book