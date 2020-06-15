import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksApp from "./App";

class  ListRead extends React.Component{
    state = {

    }



    render() {

        const {  moveTo, readList } = this.props
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            readList.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.smallThumbnail+'")' }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(e) => {moveTo(book, e.target.value)}}>
                                                    <option  value="move" disabled>Move to...</option>
                                                    <option  value="currentlyReading" selected={false}>Currently Reading</option>
                                                    <option  value="wantToRead" selected={false}>Want to Read</option>
                                                    <option  value="read" selected={readList.includes(book)}>Read</option>
                                                    <option  value="none" selected={false}>None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {book.authors ? book.authors.map((au) => (<div key={au} className="book-authors">{au}</div>) ):(<div></div>)}
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

export default ListRead