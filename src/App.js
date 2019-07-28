import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import MainSidebar from "./MainSidebar"
import MainMain from "./MainMain"
import FolderSidebar from "./FolderSidebar"
import FolderMain from "./FolderMain"
import NoteSidebar from "./NoteSidebar"
import NoteMain from "./NoteMain"
import "./App.css"
import NotefulContext from "./NotefulContext"
import AddFolder from "./AddFolder"
import AddNote from "./AddNote"

class App extends Component{

  state = {
    apiFolders: [],
    apiNotes: []
};

  componentDidMount(){
    console.log("ComponentDidMount Ran")
    fetch("http://localhost:9090/folders")
    .then(response => response.json())
    .then(responseFoldersJson => {
      console.log("HERE COME THE FOLDERS; folders to be set in state")
      console.log("responseFoldersJson:")
      console.log(responseFoldersJson)
      this.setState({
        apiFolders: responseFoldersJson,
      })
      console.log("this.setState for folders just ran")
    }) 
    fetch("http://localhost:9090/notes")
    .then(responseNotes => responseNotes.json())
    .then(responseNotesJson => {
      console.log("HERE COME THE NOTES; notes to be set in state")
      console.log("responseNotesJson:")
      console.log(responseNotesJson)
      this.setState({
        apiNotes: responseNotesJson
      })
      console.log("this.setState for notes just ran")
    }) 
  }

  deleteNote = (noteIdToDelete) => {
    console.log("deleteNote ran")
    console.log(noteIdToDelete)
    const newArray = this.state.apiNotes.filter(item => item.id !== noteIdToDelete)
    console.log("Here is the newArray, which does not contain the note to delete: ")
    console.log(newArray)
    this.setState({apiNotes: newArray})
  }

  render(){
    console.log("App component render method ran")  
   
    
    const contextValue = {
      contextFolders: this.state.apiFolders,
      contextNotes: this.state.apiNotes,
      deleteNote: this.deleteNote
    }

    return (
      <NotefulContext.Provider value={contextValue}>

      <div className="appDiv">

        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>

        <div className="sideMainContainer">
        
        {/* Main Route */}

        <Route exact path='/' 
          component={MainSidebar}
        /> 

        <Route exact path='/'
           component={MainMain}
        /> 

        {/* Folder Route */}

        <Route path="/folder/:folderId"
          component={FolderSidebar}
        />

        <Route path="/folder/:folderId"
          component={FolderMain}
        />

        {/* Note Route */}

        <Route path="/note/:noteId"
          component={NoteSidebar}
        />

        <Route path="/note/:noteId"
          component={NoteMain}
        />

        <Route path="/addfolder"
          component={AddFolder}
        />

        <Route path="/addnote"
          component={AddNote}
        />
           
        </div>
      </div>
      </NotefulContext.Provider>

    );
  }
}

export default App;