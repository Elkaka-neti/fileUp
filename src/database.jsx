import * as React from "react";

import {

  createContext, 

  useState

} from "react";

export const LayoutTag = createContext();

export function LayoutFunc({ children }) {

  const [layout, setLayout] = useState("padrao");

  

  return (

    <LayoutTag.Provider value={{layout, setLayout}}>

    

      {children}

      

    </LayoutTag.Provider>

    )

}