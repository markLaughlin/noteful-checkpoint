import React, {Component} from 'react'
import "./Main.css"

export default class AddFolder extends Component{

    handleFolderSubmit(e){
        console.log("handleSubmit method ran")
        e.preventDefault()

        let id = e.target.id.value
        let name = e.target.name.value
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

    render(){
        console.log("render method of AddFolder ran")

        return(
            <div className="mainDiv">
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
                        placeholder='name of folder here...'
                        />
                    </div>
                    <br/>

                    <button type="submit" className="bigButton">Save</button>
                    <br/>
                    <button className="bigButton" onClick={this.props.history.goBack}>Go Back</button>

                </form>
            </div>
        )
        
    }
}