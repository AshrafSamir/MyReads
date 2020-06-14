import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListRead from "./ListRead";
import ListWantToRead from "./ListWantToRead";
import ListCurrentlyReading from "./ListCurrentlyReading";
import Search from "./Search";
import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    readList: [],
    wantToReadList: [],
    currentlyReadingList: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((Allbooks) => {
      Allbooks.map((book) => {
        book.shelf === "read" && this.setState((currState) =>({
          readList: currState.readList.concat([book])
        }))
        book.shelf === "wantToRead" && this.setState((currState) =>({
          wantToReadList: currState.wantToReadList.concat([book])
        }))
        book.shelf === "currentlyReading" && this.setState((currState) =>({
          currentlyReadingList: currState.currentlyReadingList.concat([book])
        }))
    })
    })
  }

  update = (book, shelf) => {
    shelf === "read" &&
    this.setState((curr) => ({
      readList: curr.state.readList.concat([book])
        }))
    shelf === "wantToRead" &&
    this.setState((curr) => ({
      wantToReadList: curr.state.wantToReadList.concat([book])
    }))
    shelf === "currentlyReading" &&
    this.setState((curr) => ({
      currentlyReadingList: curr.state.currentlyReadingList.concat([book])
    }))
    BooksAPI.update(book, shelf)
    console.log("hii")
  }

  render() {

    return (
      <div className="app">
        <Route path='/search' render = {() => (
            <Search />
        )}/>
        <Route exact path='/' render = {() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <ListCurrentlyReading
                          moveTo={this.update}
                          currentlyReadingList = {this.state.currentlyReadingList}
                      />
                      <ListWantToRead
                          moveTo={this.update}
                          wantToReadList = {this.state.wantToReadList}
                      />
                      <ListRead
                          moveTo={this.update}
                          readList = {this.state.readList}
                      />
                    </div>
                  </div>
                  <div className="open-search">
                    {/*<button onClick={() => (<Link  to='/search'>Add a book</Link>)}>Add a book</button>*/}
                    <Link  to='/search'>Add a book</Link>
                  </div>
                </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
