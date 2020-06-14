import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListRead from "./ListRead";

class  ListCurrentlyReading extends React.Component{
    state = {

    }



    render() {
        const { moveTo, currentlyReadingList } = this.props

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            currentlyReadingList.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.smallThumbnail+'")' }}></div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option onClick={() => (moveTo(book,"currentlyReading"))} value="currentlyReading">Currently Reading</option>
                                                    <option onClick={() => (moveTo(book,"wantToRead"))} value="wantToRead">Want to Read</option>
                                                    <option onClick={() => (moveTo(book,"read"))} value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {book.authors.map((au) => (<div key={au} className="book-authors">{au}</div>) )}
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

export default ListCurrentlyReading