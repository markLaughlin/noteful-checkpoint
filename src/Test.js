import react from 'react'
import { Route} from 'react-router-dom'
import MainSidebar from "./MainSidebar"

function test(){

    return(
        <div>
        <Sidebar>
          <Route path='/' component={MainSidebar}/> 
        </Sidebar>
        </div>
    )
}

export default test