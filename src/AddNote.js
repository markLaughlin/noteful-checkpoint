import React, {Component} from 'react'
import NotefulContext from "./NotefulContext"
import AppError from "./AppError"

export default class AddNote extends Component{

    static contextType = NotefulContext

    state = {
        error: null,
        name: {value: "", touched: false},
        id: "",
        modified: "",
        content: "",
        folderId: ""
      };
    
    handleNoteSubmit = (e) => {
        console.log("handleNoteSubmit method ran")
        e.preventDefault()
        let id = this.state.id
        let name = this.state.name.value
        let modified = this.state.modified
        let content = this.state.content
        let folderId = this.state.folderId

               
        let note = {
            id: id,
            name: name,
            modified: modified,
            folderId: folderId,
            content: content
          }
          console.log(note)
          fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {'content-type': 'application/json'},
        })//fetch
        .then(response => {
            if(!response.ok){
              throw new Error("Sorry! Something went wrong with the POST request for this note.")
            }
            return response;
          })   
          .catch(error => {
            console.log(error)
            this.setState({error: error.message})
          })
    }//handleNoteSubmit

    updateId(id){
        this.setState({id: id})
    }

    updateName(name){
        this.setState({name:{value: name, touched: true}})
    }//updateName

    updateModified(modified){
        this.setState({modified: modified})
    }

    updateContent(content){
        this.setState({content: content})
    }

    updateFolderId(folderId){
        this.setState({folderId: folderId})
    }

    validateName(){
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least three characters long";
        }
      }//validateName

    render(){
        console.log("render method of AddNote ran")
        let error  = this.state.error
        const nameError = this.state.name.touched ? this.validateName() : ""


        let allFolders = this.context.contextFolders.map(folder => 
                <option key={folder.id} value={folder.id}>{folder.name}</option>
        );
        
        console.log(allFolders)

        return(
            <AppError>
                <div className="mainDiv">

                    <h1>{error}</h1>

                    <form onSubmit={this.handleNoteSubmit}>
                    <br/>
                        <div className="formInput">
                            <label htmlFor='id'>
                            ID: {" "}
                            </label>
                            <input
                            type='text'
                            name='id'
                            id='id'
                            placeholder='unique note id here...'
                            onChange = {(e) => this.updateId(e.target.value)}
                            />
                        </div>
                        <br/>

                        <h3>{nameError}</h3>

                        <div className="formInput">
                            <label htmlFor='name'>
                            Name: {" "}
                            </label>
                            <input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='name of note here...'
                            onChange = {(e) => this.updateName(e.target.value)}
                            />
                        </div>
                        <br/>

                        <div className="formInput">
                            <label htmlFor='modified'>
                            Modified: {" "}
                            </label>
                            <input
                            type='text'
                            name='modified'
                            id='modified'
                            placeholder='month-day-year'
                            onChange = {(e) => this.updateModified(e.target.value)}
                            />
                        </div>
                        <br/>

                        <div className="formInput">
                            <label htmlFor='content'>
                            Content: 
                            </label>
                            <br/>
                            <textarea
                            name='content'
                            id='content'
                            onChange = {(e) => this.updateContent(e.target.value)}
                            />
                        </div>
                        <br/>

                        <div className="formInput">
                            <label htmlFor='folder'>
                            Folder: {" "}
                            </label>
                            
                            <select name="folder" 
                            id="folder" 
                            onChange = {(e) => this.updateFolderId(e.target.value)}
                            >
                                {allFolders}
                            </select>

                        </div>
                        <br/>
                        
                        <button className="bigButton" type="submit">Save</button>

                    </form>
                </div>
            </AppError>
        );
    }
}