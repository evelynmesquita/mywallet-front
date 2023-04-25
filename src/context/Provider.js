import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [reload, setReload] = useState([])
  const [token, setToken] = useState("")

    return (
        <AppContext.Provider value={{user, setUser, reload, setReload, token, setToken}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider