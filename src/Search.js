import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from "react-router-dom";


class Search extends React.Component{

    state = {
        query: '',
        searchResult: []
    }


    updateQuery = (query) => {

        this.setState(() => ({
            query: query.trim()
        }))

        if(query.length > 0 && (typeof query === "string")){
            BooksAPI.search(query).then((result) => {

                if(result.error === "empty query"){
                    this.setState({
                        searchResult: []
                    })
                }else {
                    this.setState({
                        searchResult: this.changeSelected(result)
                    })
                }


            }).catch(error => {
                console.log(error)
            })
        }else {
            this.setState(() => ({
                searchResult: []
            }))
        }


    }
    changeSelected = (result) => {
        const { moveTo , readL , wantToL , currL } = this.props
        const newlist = [...readL,...wantToL,...currL]
        result.map((book) => {

            book.shelf = "none"
            return book
        })
        result.map((b) => {
            newlist.map(book => {
                if (book.id === b.id) {
                    b.shelf = book.shelf
                    moveTo(book, book.shelf)
                }
                return book
            })
            return b
        })
        return result
    }

    render() {

        const { query, searchResult } = this.state
        const { moveTo} = this.props

        return(
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
                        <input value={query} onChange={(e) =>(this.updateQuery(e.target.value))} type="text" placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {

                            searchResult.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'icons/book-placeholder.svg'})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={book.shelf} onChange={(e) => {moveTo(book, e.target.value) }}>
                                                    <option  value="move" disabled>Move to...</option>
                                                    <option  value="currentlyReading" >Currently Reading</option>
                                                    <option  value="wantToRead" >Want to Read</option>
                                                    <option  value="read" >Read</option>
                                                    <option  value="none" >None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {
                                            book.authors === undefined ?(<div></div>):book.authors.map((au) => (<div key={au} className="book-authors">{au}</div>) )
                                        }
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

export default Search