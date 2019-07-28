import React, { Component } from 'react';
import { NavLink, Link} from "react-router-dom";
import './Main.css'
import NotefulContext from "./NotefulContext"

class FolderMain extends Component{

    static contextType = NotefulContext
  
    render(){

      console.log("render method of FolderMain Route component ran")

      let currentFolder = "currentFolder to come"
      let currentFolderName = "currentFolderName to come"

      currentFolder = this.context.contextFolders.find(
        folder => folder.id === this.props.match.params.folderId);

      let allNotes = this.context.contextNotes
      
      let notesToDisplay = allNotes.filter(note => note.folderId === currentFolder.id)

      let displayNotes = notesToDisplay.map(note => 
          <div key={note.id} className="noteDiv">
              <NavLink to={`/note/${note.id}`}>
                    {note.name}
                </NavLink>
                <br/>
                <button className="deleteNoteButton" onClick={() => this.context.deleteNote(note.id)}>delete</button>
          </div>
        )

      if(currentFolder){
      currentFolderName = currentFolder.name
      }

      console.log("just before the return statement in FolderMain render method")
      return (
          
          <div className="mainDiv">

              <h2>{currentFolderName} Notes</h2>

              {displayNotes}

              <Link to="/addnote">
              <button className="bigButton">Add Note</button>
              </Link>

          </div>
      );
    }
  } 
  
  export default FolderMain;