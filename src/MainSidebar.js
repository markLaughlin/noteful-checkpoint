import React, { Component } from "react"
import { Link } from 'react-router-dom'
import NotefulContext from "./NotefulContext"


import "./Sidebar.css"

class MainSidebar extends Component{

    static contextType = NotefulContext;

    render(){

        console.log("render method of MainSidebar Route component ran")
       
       
       /*  if(this.context.contextFolders[0]){
            console.log("this.context.contexFolders[0].name")
            console.log(this.context.contextFolders[0].name)
        } */

        let allFolders =  this.context.contextFolders.map(folder=> 
            <div key={folder.id} className="folderDiv">
                <Link to={`/folder/${folder.id}`}>
                    {folder.name}
                </Link>
            </div>
            );

        return(

                <div className="sidebarDiv">
                        {allFolders}
                    <Link to="/addfolder">
                    <button className="folderButton">Add New Folder</button>
                    </Link>
                </div>

        )
    }
}

export default MainSidebar

