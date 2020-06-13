import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksApp from "./App";

class  ListRead extends React.Component{
    state = {
        readList: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((Allbooks) => {
            Allbooks.map((book) => {
                book.shelf === "read" && this.setState((currState) =>({
                    readList: currState.readList.concat([book])
                }))
            })
        })
    }

    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.state.readList.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.smallThumbnail+'")' }}></div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {book.authors.map((au) => (<div className="book-authors">{au}</div>) )}
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