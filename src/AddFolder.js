import React, {Component} from 'react'
import AppError from "./AppError"

export default class AddFolder extends Component{

    state = {
        error: null,
        name: {value: "", touched: false},
      };

    handleFolderSubmit =(e) =>{
        console.log("handleSubmit method ran")
        e.preventDefault()

        let id = this.state.id
        let name = this.state.name.value
        console.log(id)
        console.log(name)
        let folder = {
            name: name
        }
        console.log(folder)
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {'content-type': 'application/json'},
        }
        )//fetch
        this.props.history.push('/')
        window.location.reload(); 

    }//handleFolderSubmit

    updateName(name){
        this.setState({name:{value: name, touched: true}})
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
            <AppError>
                <div className="mainDiv">

                    {error}

                    <form onSubmit = {this.handleFolderSubmit}>

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
                            placeholder='name of folder here...'
                            onChange = {(e) => this.updateName(e.target.value)}
                            />
                        </div>

                        <br/>
                        
                        <button type="submit" className="bigButton">Save</button>

                        <br/>
                    </form>
                </div>
            </AppError>
        );
        
    }
}