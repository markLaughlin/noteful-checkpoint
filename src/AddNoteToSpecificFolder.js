import React, {Component} from 'react'
import NotefulContext from "./NotefulContext"
import AppError from "./AppError"
import PropTypes from "prop-types"

export default class AddNoteToSpecificFolder extends Component{

    static contextType = NotefulContext

    state = {
        error: null,
        name: {value: "", touched: false},
        modified: "",
        content: "",
        folderId: ""
      };
    
    handleNoteSubmit = (e) => {
        console.log("handleNoteSubmit method ran")
        e.preventDefault()
        let name = this.state.name.value
        let modified = this.state.modified
        let content = this.state.content

        let folderId = this.state.folderId
       
        let note = {
            name: name,
            modified: modified,
            folderId: folderId,
            content: content
          }
          console.log("Just before the fetch request; here is note: ")
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

    updateName(name){
        this.setState({name:{value: name, touched: true}})
    }//updateName

    updateModified(modified){
        this.setState({modified: modified})
    }

    updateContent(content){
        this.setState({content: content})
    }

    validateName(){
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least three characters long";
        }
      }//validateName

    componentDidMount(){
        let fId = this.props.match.params.folderId
        this.setState({folderId: fId})
    }

    render(){
        console.log("render method of AddNoteToSpecificFolder ran")
        let error  = this.state.error
        const nameError = this.state.name.touched ? this.validateName() : ""
        
        return(
            <AppError>
                <div className="mainDiv">

                    <h1>{error}</h1>

                    <form onSubmit={this.handleNoteSubmit}>
                    <br/>
                     
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

                        <br/>
                        
                        <button className="bigButton" type="submit">Save</button>

                    </form>
                </div>
            </AppError>
        );
    }
}

AddNoteToSpecificFolder.propTypes = {
    match: PropTypes.object
}