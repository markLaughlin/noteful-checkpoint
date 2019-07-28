import React, {Component} from 'react'
import NotefulContext from "./NotefulContext"

export default class AddNote extends Component{

    static contextType = NotefulContext
    
    handleNoteSubmit(e){
        console.log("handleNoteSubmit method ran")
        e.preventDefault()
        let id = e.target.id.value
        let name = e.target.name.value
        let modified = e.target.modified.value
        let content = e.target.content.value
        let folderId = e.target.folder.value
       
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
        }
        )//fetch
        

    }//habndleNoteSubmit

    render(){
        console.log("render method of AddNote ran")
        
        let allFolders = this.context.contextFolders.map(folder => 
                <option key={folder.id} value={folder.id}>{folder.name}</option>
        );
        
        console.log(allFolders)

        return(
            <div className="mainDiv">
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
                        />
                    </div>
                    <br/>

                    <div className="formInput">
                        <label htmlFor='name'>
                        Name: {" "}
                        </label>
                        <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='name of note here...'
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
                        />
                    </div>
                    <br/>

                    <div className="formInput">
                        <label htmlFor='folder'>
                        Folder: {" "}
                        </label>
                        
                        <select name="folder" id="folder">
                            {allFolders}
                        </select>

                    </div>
                    <br/>
                    
                    <button className="bigButton" type="submit">Save</button>
                    <br/>
                    <button className="bigButton" onClick={this.props.history.goBack}>Go Back</button>

                </form>
            </div>
        )
        
    }
}