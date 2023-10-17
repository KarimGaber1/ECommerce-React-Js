import { createContext, useState } from "react";



export let counterContext = createContext()

export default function CounterContextProvider({children}) {
    
const [counter , setCounter] = useState()

    return <counterContext.Provider value={{counter , setCounter}}>
                 {children}
              </counterContext.Provider>
} 