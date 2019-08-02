import React, { Component } from 'react';
import './Main.css'
import NotefulContext from "./NotefulContext"
import PropTypes from 'prop-types'

class NoteMain extends Component{

  static contextType = NotefulContext
  
  render(){
      console.log("render method of NoteMain Route component ran")

      let showNote = true

      let allNotes = this.context.contextNotes;
      console.log("allNotes: ")
      console.log(allNotes)

      let currentNoteId = this.props.match.params.noteId
      console.log("currentNoteId")
      console.log(currentNoteId)

      let currentNote = allNotes.filter(item => item.id === currentNoteId)
      console.log("currentNote: ")
      console.log(currentNote)
      if(currentNote.length === 1){
        console.log("currentNoteId is in allNotes")
      } 
      else {
        console.log("currentNoteId is not in allNotes")
        showNote = false
      }

      if(showNote){
        let displayNote = allNotes.filter(item => item.id === currentNoteId)
        console.log("displayNote: ")
        console.log(displayNote)

        return (
          <div className="mainDiv">
            <h2>{displayNote[0].name}</h2>

            <div className="noteDiv">

              <div className="noteContentDiv">
              {displayNote[0].content}
              </div>

            </div>

            <br/>
            Modified: {displayNote[0].modified}
            <br/>
            <br/>

            <button className="bigNoteButton" 
            onClick={
              () => {
                console.log("onClick worked")

                fetch(`http://localhost:9090/notes/${currentNoteId}`, {
                  method: 'DELETE',
                  headers: {
                    'content-type': 'application/json'
                  },
                })
                .then(() => this.context.deleteNote(currentNoteId))
              }//arrow function
            }//onClick
            >
              Delete Note
            </button>

            <br/>
            <br/>

          </div>      
      );
      }
      else return( 
          <div className="mainDiv"></div>
          );
  }
}

NoteMain.propTypes = {
  match: PropTypes.object
}
  
export default NoteMain;
