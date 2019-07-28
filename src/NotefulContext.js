import React from 'react'

const NotefulContext = React.createContext({
    contextFolders: [],
    contextNotes: [],
    deleteNote: () => {},
})

export default NotefulContext