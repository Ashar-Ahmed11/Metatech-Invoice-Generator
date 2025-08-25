import React from 'react'
import AppContext from './appContext'
import { useState } from 'react'

const AppState = (props) => {
    const [helloworld, setHelloworld] = useState("Helloworld")
    const [pdfData, setPdfData] = useState(null)
    console.clear()
    return (
        <AppContext.Provider value={{helloworld,pdfData,setPdfData}}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppState