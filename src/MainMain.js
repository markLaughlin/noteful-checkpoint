import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './Main.css'
import NotefulContext from "./NotefulContext"

class MainMain extends Component{

    static contextType = NotefulContext
  
    render(){
      console.log("render method of MainMain Route component ran")
      let allNotes = this.context.contextNotes.map(note => 
            <div key={note.id} className="noteDiv">
                  <Link to={`/note/${note.id}`}>
                  {note.name}
                  </Link>
                <br/>
                <button className="deleteNoteButton" 
                  onClick={
                    () => {
                      console.log("onClick worked")
                      fetch(`http://localhost:9090/notes/${note.id}`, {
                        method: 'DELETE',
                        headers: {
                          'content-type': 'application/json'
                        },
                      })
                      .then(() => this.context.deleteNote(note.id))
                    }
                  }
                  >
                  Delete
                </button>
            </div>
        );
      
      return (
          <div className="mainDiv">

              {allNotes}

            <Link to="addnote">
            <button className="bigButton">Add Note</button>
            </Link>

          </div>      
      );
    }
  }
  
  export default MainMain;