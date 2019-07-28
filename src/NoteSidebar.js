import React, { Component } from "react"
import NotefulContext from "./NotefulContext"

import "./Sidebar.css"

class NoteSidebar extends Component{

    static contextType = NotefulContext

    render(){
      console.log("render method of NoteSidebar ran")

      let showFolderName = true

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
        showFolderName = false
      }

      if(showFolderName){
        let displayNote = allNotes.filter(item => item.id === currentNoteId)
        console.log("displayNote: ")
        console.log(displayNote)
        console.log("displayNote[0].folderId")
        console.log(displayNote[0].folderId)
        let allFolders = this.context.contextFolders
        console.log("allFolders")
        console.log(allFolders)
        let displayFolder = allFolders.filter(folder => folder.id === displayNote[0].folderId)
        console.log("displayFolder: ")
        console.log(displayFolder)

        return(
            <div className="sidebarDiv">
                <br/>
                <br/>
                <button className="goBackButton"
                onClick={this.props.history.goBack}
                >Go Back</button>
                
                <div>
                <h2> 
                    {displayFolder[0].name}
                </h2>
                </div>
                
            </div>);
      }   
      else {
           
        return(
            <div className="sidebarDiv">
                <br/>
                <br/>
                <button className="goBackButton"
                onClick={this.props.history.goBack}
                >Go Back</button>
                
                <div>
               
                </div>
                
            </div>);
      }       
    }
}

export default NoteSidebar