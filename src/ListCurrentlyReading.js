import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListRead from "./ListRead";

class  ListCurrentlyReading extends React.Component{
    state = {
        CurrentlyReadingList: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((Allbooks) => {
            Allbooks.map((book) => {
                book.shelf === "currentlyReading" && this.setState((currState) =>({
                    CurrentlyReadingList: currState.CurrentlyReadingList.concat([book])
                }))
            })
        })
    }

    render() {
        return
    }

}

export default ListCurrentlyReading