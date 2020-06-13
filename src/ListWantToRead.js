import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListRead from "./ListRead";

class  ListWantToRead extends React.Component{
    state = {
        wantToReadList: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((Allbooks) => {
            Allbooks.map((book) => {
                book.shelf === "wantToRead" && this.setState((currState) =>({
                    wantToReadList: currState.wantToReadList.concat([book])
                }))
            })
        })
    }

render() {
    return(
        <div>{console.log("wantToRead",this.state.wantToReadList)}</div>
    )
}

}

export default ListWantToRead