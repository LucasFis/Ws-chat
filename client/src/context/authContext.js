import {createContext, useEffect, useState} from "react"
import {buscarUsuario} from "../api";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const logIn = async (nombre, contrasenia) => {
        const response = await buscarUsuario(nombre, contrasenia);
        setUser(response)
        localStorage.setItem("user", JSON.stringify(response));
        return response;
    }
    const logOut = async () => {
        localStorage.removeItem("user");
        setUser(undefined)
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