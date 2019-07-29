import React, {Component} from 'react'
import "./Main.css"

export default class AddFolder extends Component{

    state = {
        error: null,
        name: {value: "", touched: false},
        id: ""
      };

    handleFolderSubmit =(e) =>{
        console.log("handleSubmit method ran")
        e.preventDefault()

        let id = this.state.id
        let name = this.state.name.value
        console.log(id)
        console.log(name)
        let folder = {
            id: id,
            name: name
        }
        console.log(folder)
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {'content-type': 'application/json'},
        }
        )//fetch
        
    }//handleFolderSubmit

    updateName(name){
        this.setState({name:{value: name, touched: true}})
    }

    updateId(id){
        this.setState({id: id})
    }

    validateName(){
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least three characters long";
        }
      }

    render(){
        console.log("render method of AddFolder ran")
        const error = this.state.error ? <div><h1>{this.state.error}</h1></div> : ""
        const nameError = this.state.name.touched ? this.validateName() : ""

        return(
            <div className="mainDiv">

                {error}

                <form onSubmit = {this.handleFolderSubmit}>

                    <br/>
                    <div className="formInput">
                        <label htmlFor='id'>
                        ID: {" "}
                        </label>
                        <input
                        type='text'
                        name='id'
                        id='id'
                        placeholder='b0715efe-ffaf-11e8-8eb2-f2801f1b9fd2'
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
                        placeholder='name of folder here...'
                        onChange = {(e) => this.updateName(e.target.value)}
                        />
                    </div>
                    <br/>

                    <button type="submit" className="bigButton">Save</button>
                    <br/>

                </form>
            </div>
        )
        
    }
}