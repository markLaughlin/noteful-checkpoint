import React, { Component } from "react"
import {  NavLink, Link } from 'react-router-dom'
import "./Sidebar.css"
import NotefulContext from "./NotefulContext"

class FolderSidebar extends Component{

    static contextType = NotefulContext

    render(){

        console.log("render method of FolderSidebar Route component ran")

        let allFolders =  this.context.contextFolders.map(folder=>
 
            <div key={folder.id} className="folderDiv">
                <NavLink to={`/folder/${folder.id}`}>
                    {folder.name}
                </NavLink>
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

export default FolderSidebar