import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListRead from "./ListRead";

class  ListWantToRead extends React.Component{
    state = {

    }



render() {
    const { moveTo, wantToReadList } = this.props
    console.log("want",wantToReadList)
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Wamt To Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        wantToReadList.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.smallThumbnail+'")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select  onChange={(e) => {moveTo(book, e.target.value)}}>
                                                <option  value="move" disabled>Move to...</option>
                                                <option  value="currentlyReading" selected={false}>Currently Reading</option>
                                                <option  value="wantToRead" selected={wantToReadList.includes(book)}>Want to Read</option>
                                                <option  value="read" selected={false}>Read</option>
                                                <option  value="none" selected={false}>None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors ? book.authors.map((au) => (<div key={au} className="book-authors">{au}</div>)):(<div></div>)}
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

}

export default ListWantToRead