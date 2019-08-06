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
import AppError from "./AppError"
import AddNoteToSpecificFolder from "./AddNoteToSpecificFolder"

class App extends Component{

  static contextType = NotefulContext

  state = {
    apiFolders: [],
    apiNotes: [],
    error: null
  };

  componentDidMount(){
    console.log("ComponentDidMount Ran")

    fetch("http://localhost:9090/folders")
    .then(response => {
      if(!response.ok){
        throw new Error("Sorry! Something went wrong with the fetch request for folders.")
      }
      return response;
    })
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
    .catch(error => {
        console.log(error)
        this.setState({error: error.message})
    });

    fetch("http://localhost:9090/notes")
    .then(response => {
      if(!response.ok){
        throw new Error("Sorry! Something went wrong with the fetch request for notes.")
      }
      return response;
    })
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
    .catch(error => {
      console.log(error)
      this.setState({error: error.message})
    });
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
      contextError: this.state.error,
      deleteNote: this.deleteNote
    }

    const error = this.state.error ? <div><h1>{this.state.error}</h1></div> : ""

    return (
      <NotefulContext.Provider value={contextValue}>

      <div className="appDiv">

        {error}

        <header>
          <h1>
            <Link to="/">Noteful App!</Link>
          </h1>
        </header>

        <div className="sideMainContainer">
        
        <AppError>

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

            <Route exact path="/addnote"
              component={AddNote}
            />

            <Route path="/addnote/:folderId"
              component={AddNoteToSpecificFolder}
            /> 

        </AppError>
        
        </div>
      </div>
      </NotefulContext.Provider>

    );
  }
}

export default App;