import {createContext, useState} from "react"
import {buscarUsuario} from "../api";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const logIn = async (nombre, contrasenia) => {
        const response = await buscarUsuario(nombre, contrasenia);
        setUser(response)
    }
    const logOut = async () => {
        setUser(null)
    }

    const contextValue = {
        user,
        logIn,
        logOut
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}